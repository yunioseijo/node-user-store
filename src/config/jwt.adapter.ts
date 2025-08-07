import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { envs } from "./envs";
//Podría ser una dependencia o pasarlo como argumento en el generateToken
const JWT_SEED = envs.JWT_SECRET;

export class JwtAdapter {
  static async generateToken(
    payload: string | Buffer | object,
    options: SignOptions = { expiresIn: "2h" }
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const secret: Secret | undefined = JWT_SEED;

      if (!secret)
        return reject(new Error("JWT_SECRET no está definido en el entorno."));

      jwt.sign(payload, secret, options, (err, token) => {
        if (err || !token) {
          return reject(err ?? new Error("No se pudo generar el token."));
        }
        resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    throw new Error("Method not implemented.");
  }
}
