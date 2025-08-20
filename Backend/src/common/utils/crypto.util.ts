import * as crypto from 'crypto';
import { AES_CONFIG } from '../../config/aes.config';

export class CryptoUtil {
  private static algorithm = 'aes-256-cbc';

  static encrypt(buffer: Buffer): Buffer {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      AES_CONFIG.key,
      AES_CONFIG.iv,
    );
    return Buffer.concat([cipher.update(buffer), cipher.final()]);
  }

  static decrypt(buffer: Buffer): Buffer {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      AES_CONFIG.key,
      AES_CONFIG.iv,
    );
    return Buffer.concat([decipher.update(buffer), decipher.final()]);
  }
}
