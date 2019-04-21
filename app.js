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
	}
}) 

app.use(session({
	genid: (req) => { return uuid()} ,
	store: new FileStore(),
	secret: login.sessionPWD,
	resave: false,
	saveUninitialized: true, 
	cookie: {maxAge: 60000}
}))

app.use(fileUpload())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')
app.set('view engine', 'ejs')

// The landing page that just has title and log in / sign up links
app.get('/', (req, res) => {
	res.render('home')
})

// Logging in a new user page
app.get('/login', (req, res) => {
	res.render('login', {error: ''})		
})

// Logging in a new user
app.post('/login', (req, res) => {
	let credential = validator.escape(req.body.credential)
	let pwd = validator.escape(req.body.password)

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
			}
		} else {
			res.render('login', 
				{error:'There was an error with your email/username and password.'})
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

// After logging in/signing up the user directed to this page
// where it shows a list of files that the user has uploaded, if any
app.get('/main', isAuthenticated, (req, res) => {
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress	
	if(req.session.username && req.session.ip === ip) {
		let getFilesQuery = `SELECT filename FROM Files WHERE user_id=?`
		connection.query(getFilesQuery, [req.session.user_id], 
			(err, results, fields) => {
			if (err) { 
				throw err 
			}
			let user_files = results
			res.render('main', {files: user_files})
		})
	} else {
		res.redirect('/')
	}
})

// Upload a file page
app.get('/upload', isAuthenticated, (req, res) => {
	return res.render('upload', {error: ''})		
})

// Upload a file to the server
app.post('/upload', isAuthenticated, (req, res) => {
	let username = req.session.username
	if (Object.keys(req.files).length == 0) {
		return res.render('upload', {error: "No file was uploaded."})
	}
	let filename = validator.escape(req.body.file_name)
	let file = req.files.uploaded_file
	
	if (file.mimetype !== 'text/plain') {
		return res.render('upload', {error: 'File must be a text file.'})
	}
	
	let filePath = './files/'+filename
	file.mv(filePath, function(err){
		if (err) {
			return res.status(500).send(err)
		}

		fs.readFile(filePath, (err, data) => {
			if (err) {
				throw err
			}
			let stringData = data.toString('utf8')
			let contents = validator.escape(stringData)

			connection.query(`SELECT id FROM Users WHERE username=?`, username, 
				(err, results, fields) => {
				if (err) {
					throw err
				}
				let user_id = results[0].id

				let insertFileQuery = `INSERT INTO Files(user_id, filename, contents) 
				VALUES(?, ?, ?)` 
				connection.query(insertFileQuery, [user_id, filename, contents], 
					(err, results, fields) => {
					if (err) {
						return res.render('upload', {error:"There was an error inserting file into the DB"})
					}
					console.log("File Successfully Uploaded!")
					return res.render('main')
				})				
			})
		})		
	})
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

app.listen(port, () => {
	console.log(`Decryptoid app listening on port ${port}!`)
})


// Middleware functions

// Checks if session's username set and IP matches for session
// on each request to a restricted page that requires authorization
function isAuthenticated(req, res, next) {
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	let userAgent = req.headers['user-agent']
	if (!req.session.username || req.session.ip !== ip || req.session.user_agent !== userAgent) {
		return res.redirect('/')
	}
	next()
}

