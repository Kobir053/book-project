import { Request, Response } from 'express';
import {User, Book} from '../models/types.js';
import { readFromJsonFile } from '../DAL/jsonUsers.js';
import { createNewBook } from '../services/userService.js';

export async function getBooksOfUser(req: Request, res: Response) {
    try {
        const myUsers: User[] = await readFromJsonFile();
        if(!myUsers){
            res.status(500).json({message: "there isn't any users at all"});
            return;
        }

        const userID = req.query.userId;
        const user: User | undefined = myUsers.find((u) => u.id === userID);
        if(!user){
            res.status(404).json({message: `could not found the user with id ${userID}`});
            return;
        }
        res.status(200).json({books: user.books});
    } 
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export async function createBookForUser (req: Request, res: Response) {
    try {
        
        const detailsForResponse = await createNewBook(req.body.bookName, req.body.userId);
        res.status(201).json({message: detailsForResponse});
        
    } 
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}