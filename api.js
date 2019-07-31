const express = require('express')
const app = express()
const path = require('path')
const port = 3000
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

// Starts the server up
app.listen(port, () => {
    console.log(`Decryptoid app listening on port ${port}!`)
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

// API endpoint for uploading file
app.post('/api/upload', (req, res) => {
    console.log(req.body)
    // Need to make sure that the body object is not empty
    // Make sure that the values are not empty
    // Make sure that they are strings
    // And sanitize them
    // Determine what encryption algorithm is used
    // Encrypt the value
    // Return the encrypted text
    // const cipher = validator.escape()
    res.status(200).json({ msg: req.body.text })
});