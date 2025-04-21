import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../lib/token.config";
import { UserPayload } from "../models/interface";

declare module 'express' {
    interface Request {
      user?: UserPayload;
    }
  }

export class AuthenticationMiddleware {

    static verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization

            if (!authHeader || !authHeader.startsWith('Bearer')) {
                res.status(401).json({
                    message: 'Unauthorized : Token not found'
                })
                return
            }

            const token = authHeader?.split(' ')[1]
            const decoded = JwtUtils.verifyToken(token) as UserPayload;

            (req as any).user = {
                id: decoded.id,
            };

            console.log("Decoded user:", decoded)

            req.user= decoded;
            next()
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized : Token expired or invalid',
            })
        }
    }
}