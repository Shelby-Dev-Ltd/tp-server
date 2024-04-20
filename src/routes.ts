import { Request, Response, NextFunction } from 'express';
import { HelloService } from './services/hello';
import { UploadVideo } from './services/videos/UploadVideoService';
import { CreateRecord, GetAllRecords, GetRecord } from './services/records/recordService';
const express = require('express');
const router = express.Router();

// Add this middleware to parse JSON bodies
router.use(express.json());

router.get('/hi', HelloService);

//Video
router.post('/upload-video', UploadVideo);

//Records
router.get('/records', GetAllRecords);
router.get('/records/[id]', GetRecord);

router.post('/records', CreateRecord);



module.exports = router;
