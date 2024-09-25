import { NextFunction,Request,Response } from "express";
import { ifUserIdExists } from "../services/userService.js";

export function ifPassedUserId (req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.userId && !req.query.userId){
            res.status(500).json({message: "you have to enter your userID"});
            return;
        }
        const userId = req.body.userId == null? req.query.userId: req.body.userId;
        if(+ifUserIdExists(userId) < 0){
            res.status(404).json({message: "user id not founded"});
            return;
        }
        next();
    } 
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export function ifBodyContainsUserIdAndBookName (req: Request, res: Response, next: NextFunction) {
    try{
        if(!req.body.userId){
            res.status(400).json({message: "please enter a userId"});
            return;
        }
        else if(!req.body.bookName){
            res.status(400).json({message: "please enter a name for the book"});
            return;
        }

        next();
    }
    catch(error: any){
        res.status(500).json({message: error.message});
    }
}