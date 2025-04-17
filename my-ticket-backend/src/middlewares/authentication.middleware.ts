import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../lib/token.config";

export class AuthenticationMiddleware {

    static verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith('Bearer')) {
                res.status(401).json({
                    message: 'Unauthorized : Token not found'
                })
            }

            const token = authHeader?.split(' ')[1]
            const decoded = JwtUtils.verifyToken(token as string) as any
            (req as any).user= decoded;
            next()
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized : Token expired or invalid',
            })
        }
    }
}