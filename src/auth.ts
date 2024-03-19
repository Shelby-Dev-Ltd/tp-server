import passport from 'passport'

const dotenv = require('dotenv')
dotenv.config()
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`
},
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        try {
            return done(null, "User")
        } catch (e) {
            return done(e, null)
        }
    }
));

passport.serializeUser((user: any, done: any) => {
    done(null, user)
})

passport.deserializeUser((user: any, done: any) => {
    done(null, user)
})