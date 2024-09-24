var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from 'uuid';
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js";
import bcrypt from 'bcrypt';
export function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = {
                username: req.body.username,
                password: req.body.password
            };
            user.id = uuidv4();
            user.password = bcrypt.hashSync(user.password, 1);
            user.books = [];
            yield writeUserToJsonFile(user);
            res.status(201).json({ userID: user.id });
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
}
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const users = yield readFromJsonFile();
            const userIndex = users.findIndex((u) => u.username === user.username);
            if (userIndex >= 0 && bcrypt.compareSync(user.password, users[userIndex].password)) {
                res.status(200).json({ userID: users[userIndex].id });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message + "wrong" });
        }
    });
}
