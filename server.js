const express = require('express')

const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json());

app.use('/', require('./routes/index'))

app.use('/api/url',require('./routes/url'))

app.listen(5000, () => {
    console.log("App is listening on Port 5000")
})
