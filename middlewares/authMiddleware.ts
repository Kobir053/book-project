import { NextFunction,Request,Response } from "express";
import { ifUserIdExists } from "../services/userService";

export function ifPassedUserId (req: Request, res: Response, next: NextFunction) {
    try {
        if(!req.body.userId || !req.params.userId){
            res.status(500).json({message: "you have to enter your userID"});
            return;
        }
        const userId = req.body.userId == null? req.params.userId: req.body.userId;
        if(!ifUserIdExists(userId)){
            res.status(404).json({message: "user id not founded"});
            return;
        }
        next();
    } 
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}