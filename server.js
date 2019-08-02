const app = require("./api")
const port = 3000

// Starts the server up
app.listen(port, () => {
    console.log(`Decryptoid app listening on port ${port}!`)
});