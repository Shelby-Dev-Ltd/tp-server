import { Request, Response, NextFunction } from 'express';
import { HelloService } from './services/hello';
const express = require('express');
const router = express.Router();

router.get('/hi', HelloService);

module.exports = router;
