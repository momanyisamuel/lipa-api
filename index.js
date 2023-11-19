const express = require('express')
const connect = require("./utils/db")
const app = express()
const PORT = process.env.PORT || 3000
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})
app.listen(PORT, async () => {
    await connect()
    console.log(`Server running on port ${PORT}`)
})