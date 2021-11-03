const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const sslRedirect = require('heroku-ssl-redirect')
const db = require('./db')

const app = express()
const port = process.env.PORT || 8000

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN || '*' : 'http://localhost:3000' || '*',
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json())

// import and incorporate routes
const animalRouter = require('./routes/animalRouter')
const enclosureRouter = require('./routes/enclosureRouter')
const zooRouter = require('./routes/zooRouter')

app.use('/api', animalRouter)
app.use('/api', enclosureRouter)
app.use('/api', zooRouter)

db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

if (process.env.NODE_ENV === 'production') {
    app.use(sslRedirect.default());
    app.use(express.static('../client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));