var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFromJsonFile } from '../DAL/jsonUsers.js';
export function getBooksOfUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const myUsers = yield readFromJsonFile();
            if (!myUsers) {
                res.status(500).json({ message: "there isn't any users at all" });
                return;
            }
            const userID = req.query.userId;
            const user = myUsers.find((u) => u.id === userID);
            if (!user) {
                res.status(404).json({ message: `could not found the user with id ${userID}` });
                return;
            }
            res.status(200).json({ books: user.books });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
