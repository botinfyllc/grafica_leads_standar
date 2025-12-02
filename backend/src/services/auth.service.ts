import { CredentialsInterface } from '../types/services/auth';
import jwtPayload from '../types/utils/jwt';
import { decript } from '../utils/crypto';
import { createJWT, decodeJWT } from '../utils/jwt';
import supabaseServiceInstance from './supabase.service';

/**
 * Servicio de autenticación para manejo de login y validación de tokens JWT.
 */
class AuthService {
  /**
   * Inicia sesión de usuario verificando credenciales y generando un JWT.
   * @param {CredentialsInterface} credentials - Credenciales del usuario (email y password).
   * @returns {Promise<string>} JWT generado para el usuario autenticado.
   * @throws {Error} Si el usuario no existe o la contraseña es incorrecta.
   */
  public async login(credentials: CredentialsInterface): Promise<string> {
    const user = await supabaseServiceInstance.getUserData(
      credentials.email,
      credentials.id_empresa
    );
    console.log(user);

    if (user === undefined) {
      throw new Error('No se ha encontrado al usuario');
    }

    if (credentials.password !== decript(user.password)) {
      throw new Error('Contraseña incorrecta');
    }

    const jwt = createJWT({ email: user.email, id: user.id, name: user.name });
    await supabaseServiceInstance.registerLogin(user.id);

    return jwt;
  }

  /**
   * Valida un token JWT y retorna su contenido decodificado.
   * @param {string} token - Token JWT a validar.
   * @returns {any} Contenido decodificado del token.
   */
  public async validateToken(token: string): Promise<jwtPayload> {
    return decodeJWT(token);
  }
}

/**
 * Instancia única del servicio de autenticación.
 */
const AuthServiceInstance = new AuthService();

export default AuthServiceInstance;
