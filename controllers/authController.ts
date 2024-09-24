import { Request, Response } from "express";
import {User, Book} from '../models/types.js';
import {v4 as uuidv4} from 'uuid';
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js";
import bcrypt from 'bcrypt';

export async function register(req: Request,res: Response) {
    try{
        const user: User = {
            username: req.body.username,
            password: req.body.password
        };
        user.id = uuidv4();
        user.password = bcrypt.hashSync(user.password, 1);
        user.books = [];
        await writeUserToJsonFile(user);
        res.status(201).json({userID: user.id});
    }
    catch(err){
        res.status(500).send(err);
    }
}

export async function login(req: Request,res: Response) {
    try {
        const user: User = req.body;
        const users: User[] = await readFromJsonFile();
        const userIndex: number = users.findIndex((u) => u.username === user.username);

        if(userIndex >= 0 && bcrypt.compareSync(user.password, users[userIndex].password)){
            res.status(200).json({userID: users[userIndex].id});
        }
    } catch (err: any) {
        res.status(500).json({message: err.message + "wrong"})
    }
}