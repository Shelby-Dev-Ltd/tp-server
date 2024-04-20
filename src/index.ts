import session from 'express-session';

import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import routes from './routes';


dotenv.config()
const port = process.env.PORT

const app = express()

app.use(session({
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())


app.use('/', routes)

app.listen(port, () => {
    console.log(`Traffic Pulse Server listening on port ${port}`)
})
