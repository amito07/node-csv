import express from 'express';
import { userSignup,userLogin,createBulkUser } from '../Controllers/userController.js';
import upload from '../utils/multer.js';

const router = express.Router();


router.post('/signup',userSignup)
router.post('/login',userLogin)
router.post('/bulkcreate',upload.single('myfile'), createBulkUser)

export default router;

