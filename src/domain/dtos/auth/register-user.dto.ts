import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;
    if (!name) return ["Name is required", undefined];
    //Validate email format
    if (!email) return ["Email is required", undefined];
    // Second argument in the return it is not required, because it is optional and undefined by default
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Password is required", undefined];
    if (password.length < 6) return ["Password must be at least 6 characters"];
    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
