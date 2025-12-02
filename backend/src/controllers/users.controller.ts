import { Request, Response } from 'express';
import supabaseServiceInstance from '../services/supabase.service';
import { encript } from '../utils/crypto';

class UsersController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { email, password, id_empresa } = req.body;

    if (!email || !password || !id_empresa) {
      return res
        .status(400)
        .send('Email, password, and id_empresa are required');
    }

    try {
      // Aquí llamas al servicio de Supabase para crear el usuario
      const user = await supabaseServiceInstance.createUser({
        email,
        password: encript(password),
        id_empresa,
      });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send((error as Error).message);
    }
  }
}

const usersController = new UsersController();

export default usersController;
