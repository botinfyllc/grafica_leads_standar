import CryptoJS from 'crypto-js';
import config from '../config';

/**
 * Encripta un texto usando AES y una clave definida en la configuración.
 * @param {string} text - Texto plano a encriptar.
 * @returns {string} Texto cifrado en formato base64.
 */
const encript = (text: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(
    text,
    config.ENCRYPTION_KEY
  ).toString();
  return ciphertext;
};

/**
 * Desencripta un texto cifrado usando AES y una clave definida en la configuración.
 * @param {string} ciphertext - Texto cifrado en formato base64.
 * @returns {string} Texto original desencriptado.
 */
const decript = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, config.ENCRYPTION_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
};

export { encript, decript };
