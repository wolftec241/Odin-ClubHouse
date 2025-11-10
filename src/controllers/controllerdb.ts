import { get } from 'http';
import queries from '../db/queries.ts';
import bcrypt from 'bcryptjs'


const controller = async () =>{
    const db = await queries();

    const getUserByUsername = async (username: string) =>{ 
        return await db.getUserByUsername(username);
    }

    const getUserById = async (id: number) => {
        return await db.getUserById(id);
    }

    const createUser = async(username: string, password:string) =>{
        const hash = await bcrypt.hash(password,12)
        await db.createUser(username,hash);
    }

    const getAllpostsWihtoutUser = async() =>{
        return await db.getAllpostsWithoutUser();
    }

    const checkIfPasswordIsMatch = async(id: number, password:string) =>{
        const row = await db.getUsersPasswordById(id);
        const hash = typeof row !== 'undefined' ? row.password : '';
        if(!hash) throw new Error('Password hash not found');
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }

    const getAllpostsWithUser = async() =>{
        return await db.getAllpostsWithUser();
    }

    const sendMessage = async(userId: number, content: string) =>{
        return await db.sendMessage(userId, content);
    }


    return{
        getUserByUsername,
        getUserById,
        createUser,
        getAllpostsWihtoutUser,
        checkIfPasswordIsMatch,
        getAllpostsWithUser,
        sendMessage
    }
}

export default controller