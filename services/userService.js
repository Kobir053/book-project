var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, updateUserInJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { tryToGetBook } from "../otherAPI/requestForOtherAPI.js";
export const registerUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        throw new Error("Username already exists.");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUserId = uuidv4();
    const newUser = {
        id: newUserId,
        username: username,
        password: hashedPassword,
        books: []
    };
    yield writeUserToJsonFile(newUser);
    return newUserId;
});
export const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.username === username);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
    if (!passwordMatch) {
        throw new Error("Invalid username or password.");
    }
    return userFind.id; // just for typescript not to be mad
});
export function ifUserIdExists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const myUsers = yield readFromJsonFile();
        if (!myUsers) {
            throw new Error("there is not users in the DB");
        }
        const userIndex = myUsers.findIndex((user) => user.id === userId);
        return userIndex;
    });
}
export function createNewBook(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIndex = yield ifUserIdExists(userId);
            if (userIndex < 0) {
                throw new Error(`user with id ${userId} not founded`);
            }
            const searchBook = yield tryToGetBook(title);
            const newBook = {
                title: searchBook.title,
                author: searchBook.author_name[0]
            };
            newBook.id = uuidv4();
            const myUsers = yield readFromJsonFile();
            if (!myUsers) {
                throw new Error("there isn't any users at all");
            }
            console.log(`userIndex = ${userIndex}, user in this index = ${myUsers[userIndex].username}`);
            const user = myUsers[userIndex];
            user.books.push(newBook);
            console.log(user);
            yield updateUserInJsonFile(user);
            const resultDetails = {
                bookDetails: `title: ${newBook.title}, author: ${newBook.author}`,
                bookId: newBook.id
            };
            return resultDetails;
        }
        catch (error) {
            throw new Error("hefhjfbhcdhjhj " + error.message);
        }
    });
}
