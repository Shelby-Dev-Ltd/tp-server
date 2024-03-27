import { NextFunction, Request, Response } from "express"
import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import { isLoggedIn } from "./middleware"

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

app.get('/', (req: Request, res: Response) => {
    res.send('<a href="/auth/google">Authenticate</a>')
})

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
}))

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

app.get('/auth/failure', (req: Request, res: Response) => {
    res.send('Something went wrong!')
    res.redirect('/')
})

app.get('/protected', isLoggedIn, (req: any, res: Response) => {
    res.send(req.user)
})

app.use('/', routes)

app.listen(port, () => {
    console.log(`Traffic Pulse Server listening on port ${port}`)
})
