const app = require("./api").app
const port = 3000

// Starts the server up
app.listen(port, () => {
    console.log(`Decryptoid React App listening on port ${port}!`)
});