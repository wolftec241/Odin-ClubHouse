import pool from './pool.js';
async function queries() {
    const getUserByUsername = async (username) => {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0] || null;
    };
    const getUsersPasswordById = async (id) => {
        const res = await pool.query('SELECT password FROM users WHERE id = $1', [id]);
        return res.rows[0];
    };
    const createUser = async (username, password) => {
        const res = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return res.rows[0];
    };
    const getAllpostsWithoutUser = async () => {
        const res = await pool.query('SELECT content, created_at FROM posts;');
        return res.rows;
    };
    return {
        getUserByUsername,
        createUser,
        getAllpostsWithoutUser
    };
}
;
export default queries;
