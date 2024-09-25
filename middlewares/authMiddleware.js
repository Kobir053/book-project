import { ifUserIdExists } from "../services/userService.js";
export function ifPassedUserId(req, res, next) {
    try {
        if (!req.body.userId && !req.query.userId) {
            res.status(500).json({ message: "you have to enter your userID" });
            return;
        }
        const userId = req.body.userId == null ? req.query.userId : req.body.userId;
        if (!ifUserIdExists(userId)) {
            res.status(404).json({ message: "user id not founded" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
