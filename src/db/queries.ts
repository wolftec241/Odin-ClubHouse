import { get } from 'http';
import pool from './pool.ts';


async function queries(){
    const getUserByUsername = async (username: string) => {
        try{
            const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            return res.rows[0] || null;
        } catch (err) {
            console.error('Error finding user by username:', err);
            throw err;
        }
    };

    const getUserById = async(id: number) => {
        try{
            const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return res.rows[0] || null;
        } catch (err) {
            console.error('Error finding user by ID:', err);
            throw err;
        }
    }

    const getUsersPasswordById = async(id: number) =>{
        try{
            const res = await pool.query('SELECT password FROM users WHERE id = $1', [id]);
            return res.rows[0];
        } catch (err) {
            console.error('Error getting user password:', err);
            throw err;
        }
    }

    const createUser = async (username: string, password: string) => {
        try{
            const res = await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
                [username, password]
            );
            return res.rows[0];
        } catch (err) {
            console.error('Error creating user:', err);
            throw err;
        }
    };


    const getAllpostsWithoutUser = async () => {
        try{
            const res = await pool.query(
                'SELECT content, created_at FROM posts;'
            );
            return res.rows;
        } catch (err) {
            console.error('Error getting posts without user:', err);
            throw err;
        }
    };

    const getAllpostsWithUser = async () => {
        try{
            const res = await pool.query(
                `SELECT posts.content, posts.created_at, users.username 
                 FROM posts 
                 JOIN users ON posts.user_id = users.id;`
            );
            return res.rows;
        } catch (err) {
            console.error('Error getting posts with user:', err);
            throw err;
        }
    };

    const sendMessage = async(userId: number, content: string) =>{
        try{
            const res = await pool.query(
                'INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *',
                [userId, content]
            );
            return res.rows[0];
        } catch (err) {
            console.error('Error sending message:', err);
            throw err;
        }
    };

    return{
        getUserByUsername,
        getUserById,
        createUser,
        getAllpostsWithoutUser, 
        getUsersPasswordById,
        getAllpostsWithUser,
        sendMessage
    };

};

export default queries;