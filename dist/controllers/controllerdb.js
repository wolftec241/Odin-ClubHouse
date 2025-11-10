import queries from '../db/queries.js';
import bcrypt from 'bcryptjs';
const controller = async () => {
    const db = queries;
    const getUserByUsername = async (username) => {
        return await db.getUserByname(username);
    };
    const createUser = async (username, password) => {
        const hash = await bcrypt.hash(password, 12);
        await db.createUser(username, hash);
    };
    const getAllpostsWihtoutUser = async () => {
        return await getAllpostsWithoutUser();
    };
    const checkIfPasswordIsMatch = async (id, password) => {
        const hash = db.getUsersPasswordById(id);
        const isMatch = bcrypt.compare(password, hash);
        return isMatch;
    };
    return {
        getUserByUsername,
        createUser,
        getAllpostsWitoutUser,
        checkIfPasswordIsMatch
    };
};
export default controller;
