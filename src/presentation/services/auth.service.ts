import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
  LoginUserDto,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  //DI
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    //Validaciones
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("User email already exists");
    try {
      const user = new UserModel(registerUserDto);
      //Encriptar password
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //enviar email de validación
      this.sendEmailValidationLink(user.email);

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

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `<h1> Validate your email </h1> 
    <p> Click on the fallowing link <a href="${link}">here</a> to validate your email </p>`;

    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };
    const isSent = this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error while sending email");
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.badRequest("Email not found in token");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.badRequest("User not found");

    user.emailValidated = true;
    await user.save();
  };
}
