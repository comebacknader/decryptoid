const express = require('express')
const app = express()
const path = require('path')
const validator = require('validator')

app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, HEAD, OPTIONS, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

    next()
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

// API endpoint for uploading file
app.post('/api/upload', (req, res) => {
    console.log(req.body)
    // Determine what encryption algorithm is used
    // Encrypt the value
    // Return the encrypted text
    // const cipher = validator.escape()
    res.status(200).json({ msg: req.body.text })
});



module.exports = app;