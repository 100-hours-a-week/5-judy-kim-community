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

app.listen(backendPort, () => {
    console.log(`Backend server running on http://localhost:${backendPort}`);
});



 



/* import app from '../app';
import fs from 'fs';
import path from 'path';
import userRoutes from './routes/userRoutes';

app.use('/api', userRoutes);


app.post('/signup', express.json(), (req, res) => {
    const newUser = req.body;
    const filePath = path.join(__dirname, 'static', 'json-file', 'users.json');

    fs.promises.readJson(filePath)
        .then(users => {
            users = users || [];
            users.push(newUser);
            return fs.promises.writeJson(filePath, users, { spaces: 2 });
        })
        .then(() => res.status(201).send('사용자 등록 완료'))
        .catch(err => {
            console.error(err);
            res.status(500).send('사용자 데이터 처리 실패');
        });
});

app.get('/api/users', (req, res) => {
    const filePath = path.join(__dirname, 'static', 'json-file', 'users.json');

    fs.promises.readFile(filePath, 'utf8')
        .then(data => res.json(JSON.parse(data)))
        .catch(err => {
            console.error(err);
            res.status(500).send('사용자 데이터 읽기 실패');
        });
});

const backendPort = 3001;
app.listen(backendPort, () => {
    console.log(`Backend server running on http://localhost:${backendPort}`);
});
*/