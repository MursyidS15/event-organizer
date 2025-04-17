import { prisma } from "../prisma/client";
import { JwtUtils } from "../lib/token.config";
import bcrypt, { hash } from 'bcrypt'
import { UserRegister } from "../models/interface";

export class AuthService {

    public async register(data: UserRegister) {
        const { name, email, password, role } = data;
      
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          throw new Error("Email already registered");
        }
      
        const hashedPassword = await hash(password, 10);
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role,
            profile_pic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          },
        });
      
        const token = JwtUtils.generateToken({
          id: user.id,
          name: user.name,
          role: user.role as any,
        });
      
        return {
          id: user.id,
          name: user.name,
          role: user.role,
          access_token: token,
        };
      }

    public async login(email: string, password: string) {

        const user = await prisma.user.findUnique({
            where: { email: email }
        })

        if (!user) {
            return "Invalid email or password"
        }

        const isValid = await bcrypt.compare(password, user.password);

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

    public async resetPassword(email: string, newPassword: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Email not found");
        }

        const hashedPassword = await hash(newPassword, 10);
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        return { message: "Password reset successful" };
    }
}