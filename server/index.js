const dotenv = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const sslRedirect = require('heroku-ssl-redirect')
const db = require('./db')

const app = express()
const port = process.env.PORT || 8000

// initialize cors policy in express app
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ORIGIN || '*' : 'http://localhost:3000' || '*',
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json())

// import routes
const animalRouter = require('./routes/animalRouter')
const enclosureRouter = require('./routes/enclosureRouter')
const zooRouter = require('./routes/zooRouter')
const userRouter = require('./routes/userRouter')
const appointmentRouter = require('./routes/appointmentRouter')
const actionRouter = require('./routes/actionRouter')
const healthRouter = require('./routes/healthRouter')

// add routes to express app
app.use('/api', animalRouter)
app.use('/api', enclosureRouter)
app.use('/api', zooRouter)
app.use('/api', userRouter)
app.use('/api', appointmentRouter)
app.use('/api', actionRouter)
app.use('/api', healthRouter)

// db error event listener
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'))

// handles heroku ssl redirection and client build attachment
if (process.env.NODE_ENV === 'production') {
    app.use(sslRedirect.default());
    app.use(express.static('../client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
    });
}

// start listening
app.listen(port, () => console.log(`Server running on port ${port}`));