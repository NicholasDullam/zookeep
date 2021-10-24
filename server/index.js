const dotenv = require('dotenv').config()
const express = require('express');
const db = require('./db')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

app.listen(port, () => console.log(`Server running on port ${port}`));