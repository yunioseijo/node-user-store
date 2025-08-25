import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { envs } from "./envs";
//Podría ser una dependencia o pasarlo como argumento en el generateToken
const JWT_SEED = envs.JWT_SECRET;

export class JwtAdapter {
  static async generateToken(
    payload: string | Buffer | object,
    options: SignOptions = { expiresIn: "2h" }
  ) {
    return new Promise((resolve) => {
      const secret: Secret | undefined = JWT_SEED;

      if (!secret) return resolve(null);

      jwt.sign(payload, secret, options, (err, token) => {
        if (err || !token) {
          return resolve(null);
        }
        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
