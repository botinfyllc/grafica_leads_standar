import AuthServiceInstance from '../services/auth.service';
import { Request, Response } from 'express';

class AuthController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password, id_empresa } = req.body;

    if (!email || !password || !id_empresa) {
      return res
        .status(400)
        .send('Email, password, and id_empresa are required');
    }

    try {
      const token = await AuthServiceInstance.login({
        email,
        password,
        id_empresa,
      });
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(401).send((error as Error).message);
    }
  }

  public async validateToken(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('Token is valid');
  }
}

const authController = new AuthController();

export default authController;
