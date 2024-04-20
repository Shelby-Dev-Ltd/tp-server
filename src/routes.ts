import { Request, Response, NextFunction } from 'express';
import { HelloService } from './services/hello';
import { UploadVideo } from './services/videos/UploadVideoService';
import { AttachAnalyticsToRecord, CreateRecord, GetAllRecords, GetOneRecord } from './services/records/recordService';
import { CreateAnalytics, GetAllAnalytics, GetOneAnalytics } from './services/analytics/analyticsService';
import { isLoggedIn } from "./middleware"
import passport from 'passport';

const express = require('express');
const router = express.Router();

// Add this middleware to parse JSON bodies
router.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send('<a href="/auth/google">Authenticate</a>')
})

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
}))

router.get('/logout', function (req: Request, res: Response, next: NextFunction) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

router.get('/auth/failure', (req: Request, res: Response) => {
    res.send('Something went wrong!')
    res.redirect('/')
})

router.get('/protected', isLoggedIn, (req: Request, res: Response) => {
    console.log(req);
    res.send(req.user)
})

router.get('/hi', HelloService);

//Video
router.post('/upload-video', UploadVideo);

//Records
router.get('/records', GetAllRecords);
router.get('/records/[id]', GetOneRecord);

router.post('/records/attach', AttachAnalyticsToRecord)

router.post('/records', CreateRecord);

//Analytics
router.get('/analytics', GetAllAnalytics)
router.get('/analytics/[id]', GetOneAnalytics)

router.post('/analytics', CreateAnalytics)



module.exports = router;
