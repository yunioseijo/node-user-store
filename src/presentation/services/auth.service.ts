import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  //DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("User email already exists");
    try {
      const user = new UserModel(registerUserDto);
      await user.save();
      //Falta pasos importantes
      //Ecriptar la contraseña
      //Generar JWT
      //email de verificación

      const { password, ...userEntity } = UserEntity.fromObject(user);
      return { user: userEntity, token: "token" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
