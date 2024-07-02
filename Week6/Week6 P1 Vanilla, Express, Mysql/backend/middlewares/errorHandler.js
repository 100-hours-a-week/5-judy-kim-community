// backend/middleware/errorHandler.js
// 모든 에러를 처리하는 미들웨어
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || '내부 서버 오류' });
};

export default errorHandler;
