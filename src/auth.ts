import passport from 'passport'
import { UserService } from './services/users/userService';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
dotenv.config()

const userService = new UserService()

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `http://localhost:${process.env.PORT}/auth/google/callback`
},
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
        console.log(accessToken);
        try {
            const user = await userService.findUser(profile.id)
            if (!user) {
                const newUser = await userService.createUser(profile.id, profile)
                if (!newUser) throw Error("Failed to create the new user! Please try again later!")
            }
            return done(null, { profile, accessToken, refreshToken })
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