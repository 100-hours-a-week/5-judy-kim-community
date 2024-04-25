// backend/backend.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
const backendPort = process.env.PORT || 8000;

// 바디 파서 설정
app.use(bodyParser.json());

// 사용자 관련 라우트
app.use('/users', userRoutes);

import { User } from './models/User.js';
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

app.post('/posts', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            res.send('로그인 성공!');
        } else {
            res.status(401).send('로그인 실패: 잘못된 이메일 또는 비밀번호');
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(backendPort, () => {
    console.log(`Backend server running on http://localhost:${backendPort}`);
});