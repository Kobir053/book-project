import jsonfile from 'jsonfile';
import { User } from '../models/types';
import { error } from 'console';

export function writeUserToJsonFile (user: User) : void {
    jsonfile.readFile('./data/db.json')
    .then(users => {
        users.push(user);
        jsonfile.writeFile('./data/db.json', users, (err) => {
            if(err) 
                console.error(err);
        })
    })
    .catch(error => console.error(error))
}

export async function readFromJsonFile() : Promise<User[]> {
    const users: User[] = await jsonfile.readFile("./data/db.json");
    return users;
}