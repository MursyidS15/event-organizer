import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private service = new AuthService();

  public async login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
    
        const result = await this.service.login(email, password);

        res.status(200).json({
            message: 'Login successful',
            data: result
        })

    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized : Login failed, check your password',
            error: error
        })
    }
  }
}