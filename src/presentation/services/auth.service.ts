import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
  LoginUserDto,
} from "../../domain";

export class AuthService {
  //DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("User email already exists");
    try {
      const user = new UserModel(registerUserDto);
      //Falta pasos importantes
      user.password = bcryptAdapter.hash(registerUserDto.password);
      //Generar JWT
      await user.save();
      //email de verificación

      const { password, ...userEntity } = UserEntity.fromObject(user);
      return { user: userEntity, token: "token" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({ email: loginUserDto.email });
    if (!existUser) throw CustomError.badRequest("User email not found");

    const isMatch = bcryptAdapter.compare(
      loginUserDto.password,
      existUser.password
    );
    if (!isMatch) throw CustomError.badRequest("Password not match");
    const { password, ...userEntity } = UserEntity.fromObject(existUser);
    try {
      const token = await JwtAdapter.generateToken({
        id: existUser.id,
        email: existUser.email,
      });
      return { user: userEntity, token: token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
