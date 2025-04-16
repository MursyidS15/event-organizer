import { prisma } from "../prisma/client";
import { JwtUtils } from "../lib/token.config";
import bcrypt, { hash } from 'bcrypt'

export class AuthService {
    public async login(email: string, password: string) {

        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!user) {
            return "Invalid email or password"
        }

        const hashedPassword = await hash(password, 10) as any

        const isValid = await bcrypt.compare(user.password, hashedPassword)

        if (!isValid) {
            return "Invalid credentials"
        }

        const token = JwtUtils.generateToken({
            id: user.id,
            name: user.name,
            role: user.role as any
        })

        return {
            id: user.id,
            name: user.name,
            role: user.role,
            access_token: token
        }
    }
}