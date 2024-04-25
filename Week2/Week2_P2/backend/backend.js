// backend/backend.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import userRoutes from './routes/userRoutes.js';
import { User } from './models/User.js';

const backendPort = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // JSON 바디 파서

// 사용자 관련 라우트
app.use('/users', userRoutes);

app.get('/check-email', async (req, res) => {
    const emailToCheck = req.query.email;
    if (!emailToCheck) {
        console.error('No email provided in query');
        return res.status(400).json({ error: 'Email parameter is missing' });
    }
    try {
        const users = await User.readUsers();
        const emailExists = users.some(user => user.email === emailToCheck);
        res.json({ emailExists });
    } catch (err) {
        console.error('Error checking email:', err);
        res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
});

// 평문 비밀번호
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).send({ message: '로그인 실패: 사용자를 찾을 수 없습니다.' });
        }
        // 평문 비밀번호 직접 비교
        if (password === user.password) {
            res.send({ message: '로그인 성공!' });
        } else {
            res.status(401).send({ message: '로그인 실패: 잘못된 비밀번호입니다.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});


/* 비밀번호를 해싱하여 저장
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).send({ message: '로그인 실패: 사용자를 찾을 수 없습니다.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.send({ message: '로그인 성공!' });
        } else {
            res.status(401).send({ message: '로그인 실패: 잘못된 비밀번호' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});*/

app.listen(backendPort, () => {
    console.log(`Backend server running on http://localhost:${backendPort}`);
});