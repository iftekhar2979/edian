import jwt from 'jsonwebtoken';

export function verifyToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject('Invalid or expired token');
      } else {
        resolve(decoded);
      }
    });
  });
}