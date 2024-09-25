import jsonfile from 'jsonfile';
import { User } from '../models/types';
import dotenv from 'dotenv';

dotenv.config();
const DB_PATH: string = process.env.DB_PATH || './data/db.json';

export function writeUserToJsonFile (user: User) : void {
    jsonfile.readFile(DB_PATH)
    .then((users) => {
        users.push(user);
        jsonfile.writeFile(DB_PATH, users, (err: any) => {
            if(err) 
                throw new Error(err);
        })
    })
    .catch((error) => {
        throw new Error(error)
    })
}

export async function readFromJsonFile() : Promise<User[]> {
    const users: User[] = await jsonfile.readFile(DB_PATH);
    return users;
}