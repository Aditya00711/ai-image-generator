const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 7000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/openai', require('./routes/openaiRoutes'))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`Server is running on port ${port}`))
