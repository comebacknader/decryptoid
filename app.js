const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const port = 3000
const login = require('./login')
const validator = require('validator')
const crypto = require('crypto')
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session)
const fileUpload = require('express-fileupload')
const fs = require('fs')
const process = require('process')
const moment = require('moment')

// With MySQL version 8 special plug-in 
// called "mysql_native_password" required
const mysql = require('mysql')
const connection = mysql.createConnection({
	host	    : login.hn,
	user      : login.un,
	password  : login.pw,
	database  : login.db
})

connection.connect(function(err) {
	if (err) {
		console.error('error connection' + err.stack)
		throw err
	} else {
		// Successfully connected to the database
		console.log("Successfully connected to database!")
	}
}) 

// Disconnects from database should app exit
process.on('exit', function(){
	connection.destroy()
})

app.use(session({
	genid: (req) => { return uuid()} ,
	store: new FileStore(),
	secret: login.sessionPWD,
	resave: false,
	saveUninitialized: true, 
	cookie: {maxAge: 60000 * 10}
}))

app.use(fileUpload())

app.use(express.static('build'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Logging in a new user
app.post('/login', (req, res) => {
	let credential = validator.escape(req.body.credential)
	let pwd = validator.escape(req.body.password)

	// Make sure that credential and password are the right size
	// validateLength helper function defined near EOF
	credValidErr = validateLength(credential, "Username/Email")
	pwdValidErr = validateLength(pwd, "Password")
	if (credValidErr !== '') {
		res.render('login', {error: credValidErr})
		return
	} else if (pwdValidErr !== '') {
		res.render('login', {error: pwdValidErr})
		return
	}

	let checkUserExistQuery = `SELECT id, password FROM Users WHERE 
		username=` + connection.escape(credential) + ` OR email=`
		+ connection.escape(credential)

	connection.query(checkUserExistQuery, function(error, results, fields) {
		if (results.length !== 0) {
			let salt1 = '2&32fvj'
			let salt2 = '3aws321'
			let saltedPass = salt1 + pwd + salt2
			let hash = crypto.createHash('ripemd160')
			let hashPass = hash.update(saltedPass, 'utf8')
			let digest = hashPass.digest('hex')
			let password = results[0].password
			let user_id = results[0].id
			if (digest === password) {
				req.session.username = credential
				req.session.user_id = user_id
				let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
				let userAgent = req.headers['user-agent']
				req.session.ip = ip
				req.session.user_agent = userAgent								
				res.redirect('/main')
			} else {
				res.render('login', 
					{error:'There was an error with your email/username and password.'})
				return
			}
		} else {
			res.render('login', 
				{error:'There was an error with your email/username and password.'})
			return
		}
	})
})

// Signing up a new user page
app.get('/signup', (req, res) => {
	res.render('signup', {error:''})
})

// Signing up a new user
app.post('/signup', (req, res) => {
	let email = validator.escape(req.body.email)
	let uname = validator.escape(req.body.username)
	let pwd = validator.escape(req.body.password)

	emailValidErr = validateLength(email, "Email")
	unameValidErr = validateLength(uname, "Username")
	pwdValidErr = validateLength(pwd, "Password")

	if (emailValidErr !== '') {
		res.render('login', {error: emailValidErr})
	} else if (unameValidErr !== '') {
		res.render('login', {error: unameValidErr})
	} else if (pwdValidErr !== '') {
		res.render('login', {error: pwdValidErr})
	}

	if(!validator.isEmail(credential)) {
		res.render('login', {error: "That is not a proper email address."})
	}	

	let checkUserExistQuery = `SELECT * FROM Users WHERE 
		username=` + connection.escape(uname) + ` OR email=`
		+ connection.escape(email)

	connection.query(checkUserExistQuery, function(error, results, fields) {
		if (results.length == 0) {
			let salt1 = '2&32fvj'
			let salt2 = '3aws321'
			let saltedPass = salt1 + pwd + salt2
			let hash = crypto.createHash('ripemd160')
			let hashPass = hash.update(saltedPass, 'utf8')
			let digest = hashPass.digest('hex')
			let insertUserQuery = `INSERT INTO Users(username, email, password) 
				VALUES(?, ?, ?)`
			connection.query(insertUserQuery, [uname, email, digest], 
				function(err, results, fields) {
				if (err) {
					console.log(err.code)
					res.redirect('/')
				} else {
					// Get the user ID and store it
					let getUserIDQuery = `SELECT id FROM Users WHERE username=?`
					connection.query(getUserIDQuery, [uname], 
						(err, results, fields) => {
						if (err) {
							throw err
						}
						req.session.user_id = results[0].id
						req.session.username = uname
						let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
						let userAgent = req.headers['user-agent']
						req.session.ip = ip
						req.session.user_agent = userAgent
						res.redirect('/main')
					})
				}
			})	
		} else {
			res.render('signup', {error:'There was an error with your email/username.'})
		}
	})	
})

// Logs a User out
app.post('/logout', isAuthenticated, (req, res) => {
	// Delete the session
	req.session.destroy()
	return res.redirect('/')
	// Redirect to homepage
})

// After logging in/signing up the user directed to this page
// where it shows a list of files that the user has uploaded, if any
app.get('/main', isAuthenticated, (req, res) => {
	let getFilesQuery = `SELECT filename FROM Files WHERE user_id=?`
	connection.query(getFilesQuery, [req.session.user_id], 
		(err, results, fields) => {
		if (err) { 
			throw err 
		}
		let user_files = results
		res.render('main', {files: user_files})
	})
})

// Upload a file page
app.get('/upload', isAuthenticated, (req, res) => {
	return res.render('upload', {error: ''})		
})

// Upload a file to the server
app.post('/upload', isAuthenticated, (req, res) => {
	let username = req.session.username
	const operation = validator.escape(req.body.operation)

	// Check if valid algorithm
	const simpleSub = 'simple_sub'
	const doubleTrans = 'double_tran'
	const rc4 = 'rc4'	
	const algorithm = validator.escape(req.body.algorithm)

	if (algorithm !== simpleSub && algorithm !== doubleTrans
		&& algorithm !== rc4) {
		return res.render('upload', {error: 'Ivalid algorithm selected.'})
	}
	const cipher = algorithm
	const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')


	// Check if file was uploaded or text uploaded
	// Check if they included their filename
	let filename = validator.escape(req.body.file_name)
	const crypt_content = validator.escape(req.body.crypt_content)
	if (crypt_content === '') {
		
		// If user didn't write any content / uploaded file
		if (Object.keys(req.files).length == 0) {
			return res.render('upload', {error: "No file was uploaded."})
		}

		// If user didn't enter a filename
		// Use filename from file
		if (filename === '') {
			filename = validator.escape(req.files.name)
		}

		const file = req.files.uploaded_file
		if (file.mimetype !== 'text/plain') {
			return res.render('upload', {error: 'File must be a text file.'})
		}

		let filePath = './files/'+filename
		file.mv(filePath, function(err){
			if (err) {
				console.log("Error creating file to: " + filePath)
				return res.status(500).send(err)
			}

			fs.readFile(filePath, (err, data) => {
				
				if (err) {
					throw err
				}

				let stringData = data.toString('utf8')
				let contents = validator.escape(stringData)
				let convertedContent = runAlgos(contents, algorithm, operation)

				connection.query(`SELECT id FROM Users WHERE username=?`, username, 
					(err, results, fields) => {
					if (err) {
						throw err
					}
					let user_id = results[0].id

					let insertFileQuery = `INSERT INTO Files(user_id, filename, contents, time_created, cipher) 
					VALUES(?, ?, ?, ?, ?)` 
					connection.query(insertFileQuery, [user_id, filename, convertedContent, timestamp, algorithm], 
						(err, results, fields) => {
						if (err) {
							console.log("Error inserting file into db.")
							return res.render('upload', {error:"There was an error inserting file into the DB"})
						}

						return res.redirect('/file/'+filename)
					})				
				})
			})		
		})
	} else {
		if (filename === '') {
			return res.render('upload', {error: 'Please enter a filename.'})
		}
		const contents = crypt_content

		let convertedContent = runAlgos(contents, algorithm, operation)

		connection.query(`SELECT id FROM Users WHERE username=?`, username, 
			(err, results, fields) => {
			if (err) {
				throw err
			}
			let user_id = results[0].id

			let insertFileQuery = `INSERT INTO Files(user_id, filename, contents, time_created, cipher) 
			VALUES(?, ?, ?, ?, ?)` 
			connection.query(insertFileQuery, [user_id, filename, convertedContent, timestamp, algorithm], 
				(err, results, fields) => {
				if (err) {
					console.log("Error inserting file into DBB.")
					return res.render('upload', {error:"There was an error inserting file into the DB"})
				}

				return res.redirect('/file/'+filename)
			})				
		})		 
	}
})

// Show the particular file page
app.get('/file/:name', isAuthenticated, (req, res) => {
	let filename = validator.escape(req.params.name)
	// Get contents of file
	let getContentQuery = `SELECT contents FROM Files WHERE filename=?`
	connection.query(getContentQuery, [filename], (err, results, fields) => {
		if (results.length == 0) {
			return res.redirect('/main')
		}
		let content = results[0].contents
		return res.render('show_file', {filename: filename, content: content})

	})
})

// Starts the server up
app.listen(port, () => {
	console.log(`Decryptoid app listening on port ${port}!`)
})


// Middleware functions & Helper Functions

// Checks session set, IP matches, and User Agent matches
// on each request to a restricted page that requires authorization
function isAuthenticated(req, res, next) {
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	let userAgent = req.headers['user-agent']
	if (!req.session.username || req.session.ip !== ip || req.session.user_agent !== userAgent) {
		return res.redirect('/login')
	}
	next()
}

// Validates the length of username, email, and password
function validateLength(content, name) {
	// Validation variables
	const minLength = 5
	const maxLength = 50

	if (content.length < 5) {
		return `${name} too short. Must be greater than ${minLength} characters.`
	} else if (content.length > 50) {
		return `${name} too long. Must be shorter than ${maxLength} characters.`
	} else {
		return ''
	}
}

// Runs the algorithm on the supplied content with a specified encrypt/decrypt operation
function runAlgos(contents, algorithm, operation) {
	const simpleSub = 'simple_sub'
	const doubleTrans = 'double_tran'
	const rc4 = 'rc4'	
	let content;
	if (algorithm === simpleSub) {
		content = validator.escape(simpleSubstitution(contents, operation))
	} else if (algorithm === doubleTrans) {
		content = validator.escape(doubleTransposition(contents))
	} else {
		content = validator.escape(rc4Algo(contents))
	}
	return content			
}

// Encrypt/Decrypt Algorithm Functions

// Simple Substitution Cipher
// On encrypt: convert to UTF-16, and add by 1
// On decrypt: convert to UTF-16, and subtract by 1
function simpleSubstitution(content, operation) {
	let text = "";
	for (let i = 0; i < content.length; i++) {
		// if operation encrypt, add 1 to number
		let utf16num = content.charCodeAt(i)
		if (operation == "encrypt") {
			utf16num += 1	
		} else {
			utf16num -= 1
		}
		text += String.fromCharCode(utf16num)
	}
	return text
}

// Double Transposition Cipher
function doubleTransposition(content) {
	let length = content.length
	let colLength
	let rowLength
	if (length < 5) {
		colLength = 3 
		rowLength = 2
	} else {
		colLength = 5 
		rowLength = parseInt(length / 5)
		if (length % 5 !== 0) {
			rowLength += 1
		}
	} 
  let array = []
	let count = 0

	for (let x = 0; x < rowLength; x++) {
		let row = []
		for (let y = 0; y < colLength; y++) {
			if (count < length) {
				row[y] = content.charAt(count++)				
			}
		}
		array.push(row)		
	}

	for (let x = 0; x < rowLength; x++) {
		for (let y = 0; y < colLength; y += 2) {
			if (y + 1 < colLength) {
				let temp = array[x][y]
				array[x][y] = array[x][y+1]
				array[x][y+1] = temp				
			}
		}
	}

	for (let x = 0; x < rowLength; x += 2) {
		for (let y = 0; y < colLength; y++) {
			if (x + 1 < rowLength) {
				let lengthNextRow = array[x+1].length
				if (y < lengthNextRow) {
					let temp = array[x][y]
					array[x][y] = array[x+1][y]
					array[x+1][y] = temp						
				}		
			}
		}
	}
	let convertedString = ''
		for (let x = 0; x < rowLength; x++) {
		for (let y = 0; y < colLength; y++) {
			if (array[x][y] !== undefined) {
				convertedString += array[x][y]
			}
		}
	} 
	return convertedString
}

// rc4 Cipher
function rc4Algo(content) {
	let n = 256
	let S = []
	let key = 'thisisthekey'
	let length = key.length
	let i = 0

	let text = ''

	for (let x = 0; x < n; x++) {
		S[x] = x
	}

	for (let x = 0; x < n; x++) {
		i = (i + S[x] + (key[x % length]).charCodeAt()) % n
		swap(S, x, i)
	}

	let y = 0
	let z = 0
	for (let x = 0; x < content.length;x++) {
		y = (y + 1) % n
		z = (z + S[y]) % n
		swap(S, y, z)
		let random = S[(S[y] + S[z]) % n]
		text += String.fromCharCode(random ^ content[x].charCodeAt())
	}
	return text
}

// Helper swap function used in rc4 algorithm
function swap(array, a, b) {
	let tmp = array[a]
	array[a] = array[b]
	array[b] = tmp
}
