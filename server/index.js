const dotenv = require('dotenv').config()
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect')
const db = require('./db')

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

// import and incorporate routes
const zooRouter = require('./routes/zooRouter')

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