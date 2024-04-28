// backend/backend.js
import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';


const backendPort = process.env.PORT || 8000;
const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); // JSON 바디 파서

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
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 라우트
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use(errorHandler);

app.listen(backendPort, () => {
    console.log(`Backend server running on http://localhost:${backendPort}`);
});
