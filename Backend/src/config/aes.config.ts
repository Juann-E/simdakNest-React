if (!process.env.AES_KEY || !process.env.AES_IV) {
  throw new Error('AES_KEY / AES_IV environment variables not set');
}
export const AES_CONFIG = {
  key: Buffer.from(process.env.AES_KEY, 'hex'),
  iv: Buffer.from(process.env.AES_IV, 'hex'),
};
