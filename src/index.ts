import { NextFunction, Request, Response } from "express"
import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'

const session = require('express-session')

require('./auth')

dotenv.config()
const port = process.env.PORT

const app = express()
app.use(session({
    secret: 'keyboard cat',
}));
app.use(passport.initialize())
app.use(passport.session())

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user)
    req.user ? next() : res.sendStatus(401)
}

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
    res.send(`Hello ${req.user.displayName}`)
})

app.listen(port, () => {
    console.log(`Traffic Pulse Server listening on port ${port}`)
})
