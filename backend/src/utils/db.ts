import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASWD || '',
  database: process.env.DB_NAME || 'pilkosis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    // Tes koneksi dengan melakukan query sederhana
    const [rows] = await pool.query<[RowDataPacket]>('SELECT 1 + 1 AS solution');
    console.log('Database connected successfully. Result:', rows[0].solution);

    // Optional: Menampilkan nama database saat ini
    const [dbResult] = await pool.query<[RowDataPacket]>('SELECT DATABASE() AS db');
    console.log('Connected to database:', dbResult[0].db);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

export default pool;
