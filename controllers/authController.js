var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { authenticateUser, registerUser } from "../services/userService.js";
export function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(400).json({ error: "Username and password are required." });
                return;
            }
            const user = {
                username: req.body.username,
                password: req.body.password
            };
            const userID = yield registerUser(user.username, user.password);
            res.status(201).json({ userID: userID });
        }
        catch (error) {
            if (error.message === "Username already exists.") {
                res.status(409).json({ error: error.message });
            }
            else {
                console.error("Error registering user:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        }
    });
}
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.username || !req.body.password) {
                res.status(400).json({ error: "Username and password are required." });
                return;
            }
            const user = {
                username: req.body.username,
                password: req.body.password
            };
            const userID = yield authenticateUser(user.username, user.password);
            res.status(200).json({ userId: userID.toString() });
        }
        catch (error) {
            if (error.message === "Invalid username or password.") {
                res.status(401).json({ error: error.message });
            }
            else {
                console.error("Error during login:", error);
                res.status(500).json({ error: "Internal server error." });
            }
        }
    });
}
