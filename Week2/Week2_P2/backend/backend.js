// backend/backend.js
import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import userRoutes from './routes/userRoutes.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/User.js';

const backendPort = process.env.PORT || 8000;
const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // JSON 바디 파서
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FileStore = sessionFileStore(session);

app.use(session({
    store: new FileStore({
        path: './sessions', // 세션 파일 저장 경로
        ttl: 86400, // 세션의 생명 주기 (초 단위)
        retries: 0 // 파일을 읽을 때의 재시도 횟수
    }),
    name: 'seesion_id',
    secret: 'your_secret_key', // 세션을 암호화하기 위한 비밀키
    resave: false,             // 세션을 항상 저장할지 여부를 정하는 값
    saveUninitialized: true,   // 초기화되지 않은 세션을 스토어에 저장
    cookie: {
      httpOnly: true,          // 클라이언트 JavaScript가 쿠키를 볼 수 없도록 함
      secure: true,            // HTTPS를 통해서만 쿠키가 전송됨, 개발 환경에서는 false, HTTPS 환경에서는 true로 설정
      maxAge: 24 * 60 * 60 * 1000 // 쿠키 유효기간 (여기서는 24시간)
    }
}));

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

// 비밀번호를 해싱하여 비교, 로그인
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).send({ message: '로그인 실패: 사용자를 찾을 수 없습니다.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // 세션에 사용자 정보 저장
            req.session.userId = user.id;
            req.session.username = user.username;
            res.send({ message: '로그인 성공!' });
        } else {
            res.status(401).send({ message: '로그인 실패: 잘못된 비밀번호입니다.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// 게시글 데이터가 저장된 JSON 파일
app.get('/api/posts', (req, res) => {
    const filePath = path.join(__dirname, '..', 'data', 'posts.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('파일을 읽는 중 오류가 발생했습니다.');
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('JSON 데이터 파싱 중 오류가 발생했습니다.');
        }
    });
});

// 개별 게시글 조회
app.get('/api/posts/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const filePath = path.join(__dirname, '..', 'data', 'posts.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '파일을 읽는 중 오류가 발생했습니다.' });
            return;
        }
        try {
            const posts = JSON.parse(data);
            const post = posts.find(p => p.id === postId);
            if (!post) {
                res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
            } else {
                res.json(post);
            }
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).json({ error: 'JSON 데이터 파싱 중 오류가 발생했습니다.' });
        }
    });
});

// 댓글 데이터가 저장된 JSON 파일
app.get('/api/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    const filePath = path.join(__dirname, '..', 'data', 'comments.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('댓글 데이터를 읽는 중 오류가 발생했습니다.');
            return;
        }
        const comments = JSON.parse(data);
        const postComments = comments.filter(comment => comment.postId === parseInt(postId));
        res.json(postComments);
    });
});

app.listen(backendPort, () => {
    console.log(`Backend server running on http://localhost:${backendPort}`);
});