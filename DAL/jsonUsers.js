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
    if (!fs.readFileSync(DB_PATH)) {
        jsonfile.writeFileSync(DB_PATH, []);
    }
    jsonfile.readFile(DB_PATH)
        .then((users) => {
        users.push(user);
        jsonfile.writeFile(DB_PATH, users, (err) => {
            if (err)
                throw new Error(err);
        });
    })
        .catch((error) => {
        throw new Error(error);
    });
}
export function readFromJsonFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield jsonfile.readFile(DB_PATH);
        return users;
    });
}
