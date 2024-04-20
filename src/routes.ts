import { Request, Response, NextFunction } from 'express';
import { HelloService } from './services/hello';
import { UploadVideo } from './services/videos/UploadVideoService';
import { AttachAnalyticsToRecord, CreateRecord, GetAllRecords, GetOneRecord } from './services/records/recordService';
import { CreateAnalytics, GetAllAnalytics, GetOneAnalytics } from './services/analytics/analyticsService';
const express = require('express');
const router = express.Router();

// Add this middleware to parse JSON bodies
router.use(express.json());

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
