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
    //Validaciones
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("User email already exists");
    try {
      const user = new UserModel(registerUserDto);
      //Encriptar password
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();
      //email de verificación

      //Generar JWT
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      const { password, ...userEntity } = UserEntity.fromObject(user);
      return { user: userEntity, token: token };
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

    const token = await JwtAdapter.generateToken({ id: existUser.id });
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    return { user: userEntity, token: token };
  }
}
