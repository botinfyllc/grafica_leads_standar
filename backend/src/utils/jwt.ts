import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config';
import jwtPayload from '../types/utils/jwt';

/**
 * Crea un JSON Web Token (JWT) firmado con el secreto de la aplicación.
 * @param {string | object | Buffer} payload - Datos que se incluirán en el token.
 * @param {SignOptions['expiresIn']} [expiresIn='2h'] - Tiempo de expiración del token.
 * @returns {string} El token JWT generado.
 */
export function createJWT(
  payload: string | object | Buffer,
  expiresIn: SignOptions['expiresIn'] = '2h'
): string {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
}

/**
 * Decodifica y verifica un JWT usando el secreto de la aplicación.
 * @param {string} token - El token JWT a verificar y decodificar.
 * @returns {jwtPayload} Los datos del usuario extraídos del token.
 * @throws {Error} Si el token es inválido o no puede ser verificado.
 */
export function decodeJWT(token: string): jwtPayload {
  try {
    return jwt.verify(token, config.JWT_SECRET) as jwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
