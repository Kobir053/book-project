import jsonfile from 'jsonfile';
import { User } from '../models/types';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const DB_PATH: string = process.env.DB_PATH || './data/db.json';

export async function writeUserToJsonFile (user: User) : Promise<void> {
    try {
        const users = await jsonfile.readFile(DB_PATH);
        users.push(user); 
        jsonfile.writeFileSync(DB_PATH, users);
    } 
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateUserInJsonFile(user: User) : Promise<void> {
    try {
        const myUsers = await jsonfile.readFile(DB_PATH);
        if(!myUsers){
            throw new Error("there isn't json file..");
        }
        const userIndex = myUsers.findIndex((u: User) => u.username === user.username && u.password === user.password);
        if(userIndex < 0){
            throw new Error("user not founded while trying to change his details..");
        }
        myUsers[userIndex] = user;
        jsonfile.writeFileSync(DB_PATH, myUsers);
    } 
    catch (error: any) {
        throw new Error(error.message);
    }
}

export async function readFromJsonFile() : Promise<User[]> {
    const users: User[] = await jsonfile.readFile(DB_PATH);
    return users;
}

export async function ensureDatabaseExist () {
    if(!fs.readFileSync(DB_PATH)){
        await jsonfile.writeFile(DB_PATH, []);
    }
}