import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',                    // MySQL 서버 호스트
  user: 'root',                         // MySQL 사용자
  password: 'SSohuikim3733!',           // MySQL 비밀번호
  database: 'community',                // 사용할 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
