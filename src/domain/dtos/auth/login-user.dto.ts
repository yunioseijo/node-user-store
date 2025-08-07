import { regularExps } from "../../../config";

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    //Validate email format
    if (!email) return ["Email is required", undefined];
    // Second argument in the return it is not required, because it is optional and undefined by default
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Password is required", undefined];
    if (password.length < 6) return ["Password must be at least 6 characters"];
    return [undefined, new LoginUserDto(email, password)];
  }
}
