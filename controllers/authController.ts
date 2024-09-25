import { Request, Response } from "express";
import {User, Book} from '../models/types.js';
import { authenticateUser, registerUser } from "../services/userService.js";

export async function register(req: Request,res: Response) {
    try{
        if (!req.body.username || !req.body.password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }

        const user: User = {
            username: req.body.username,
            password: req.body.password
        };

        const userID = await registerUser(user.username, user.password);
        res.status(201).json({userID: userID});
    }
    catch(error: any){
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        } 
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
}

export async function login(req: Request,res: Response) {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }

        const user: User = req.body;
        const userID = authenticateUser(user.username, user.password);
        res.status(200).json({userId: userID});
    }
    catch (error: any) {
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
}