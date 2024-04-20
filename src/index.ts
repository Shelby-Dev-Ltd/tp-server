import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
const session = require('express-session')

require('./auth')

dotenv.config()
const port = process.env.PORT

const app = express()

app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

const routes = require('./routes')

app.use('/', routes)

app.listen(port, () => {
    console.log(`Traffic Pulse Server listening on port ${port}`)
})
