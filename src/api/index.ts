import express from 'express';
import getImage from '../middleware/getImage'
import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.use('/', getImage );



export default router;
