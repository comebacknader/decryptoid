const express = require('express')
const app = express()
const path = require('path')
const validator = require('validator')
const logger = require('morgan')
const mongo = require('mongodb').MongoClient
const fs = require('fs')

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
    next()
});

const url = "mongodb://localhost:27017"
let db

// mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}

// 	db = client.db("decryptoid")
// 	client.close()
// });

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

// API endpoint for uploading file
app.post('/api/upload', (req, res) => {
    if (isEmpty(req.body)) {
        // I need to log the error to a log file
	   res.status(400).json({error: "There was an error with your request."});
	   return
    }

    if (req.body.cipher === "" || req.body.text === "") {
		res.status(400).json({error: "Please be sure to choose a cipher and input text."});
		return
    } 

    if (typeof req.body.cipher !== "string" || typeof req.body.text !== "string") {
		res.status(400).json({error: "There was an error with your request."})
		return
    }

    if (req.body.text.length >= 50) {
		res.status(400).json({error: "The input must be less than 50 characters long."})
		return
    }

    let algorithm = req.body.cipher
    if (algorithm !== "simple-substitution" && algorithm !== "double-transposition" && algorithm !== "RC4") {
		res.status(400).json({error: "The algorithm you selected is incorrect."})
		return
    }

    // Determine what encryption algorithm is used
    let encrypted
    switch(algorithm) {       
        case "simple-substitution":
            encrypted = simpleSubstitution(req.body.text)   
            break
        case "double-transposition":
            encrypted = doubleTransposition(req.body.text)   
            break
        case "RC4":
            encrypted = rc4Algo(req.body.text)
            break
   }

//    db.collection("encryptions").encryptionsTable.insertOne({message: encrypted}, (err, result) => {
// 		if (err) {
// 			console.log(err)
// 			res.status(400).json({error: "Encryption couldn't be saved."});
// 		}

// 		res.status(200).json({ msg: encrypted });
//    });
   	res.status(200).json({msg: encrypted})
});

// Helper Functions
function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}

// Swap function used in RC4 Algorithm
function swap(array, a, b) {
	let tmp = array[a]
	array[a] = array[b]
	array[b] = tmp
}

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

module.exports = {app: app, mongo: mongo};