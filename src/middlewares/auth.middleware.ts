import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default {
    checkAuthentication: (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({message: "Acesso negado!"});
        }

        try {
            const secret = process.env.SECRET || "defaultSecret";

            jwt.verify(token, secret);
            next();
        } catch(err) {
            return res.status(401).json({message: "Token inválido!"});
        }
    }
};
