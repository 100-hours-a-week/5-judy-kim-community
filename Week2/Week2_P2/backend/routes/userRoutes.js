// /backend/routes/userRoutes.js

import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';

import { postSignup, getUsers } from '../controllers/userController.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolderPath = path.join(__dirname, '..', '..', 'images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageFolderPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('profileImage'), postSignup);
router.get('/', getUsers);

export default router; 
