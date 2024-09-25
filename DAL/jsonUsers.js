var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const DB_PATH = process.env.DB_PATH || './data/db.json';
export function writeUserToJsonFile(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield jsonfile.readFile(DB_PATH);
            users.push(user);
            jsonfile.writeFileSync(DB_PATH, users);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
export function updateUserInJsonFile(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const myUsers = yield jsonfile.readFile(DB_PATH);
            if (!myUsers) {
                throw new Error("there isn't json file..");
            }
            const userIndex = myUsers.findIndex((u) => u.username === user.username && u.password === user.password);
            if (userIndex < 0) {
                throw new Error("user not founded while trying to change his details..");
            }
            myUsers[userIndex] = user;
            jsonfile.writeFileSync(DB_PATH, myUsers);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
export function readFromJsonFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield jsonfile.readFile(DB_PATH);
        return users;
    });
}
export function ensureDatabaseExist() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.readFileSync(DB_PATH)) {
            yield jsonfile.writeFile(DB_PATH, []);
        }
    });
}
