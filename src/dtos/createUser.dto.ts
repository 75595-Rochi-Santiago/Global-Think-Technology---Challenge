import { IsString, IsEmail } from "class-validator";
import { Trim } from "class-sanitizer";

export default class CreateUserDto {
  @IsString()
  @Trim()
  public name: string;

  @IsEmail({}, { message: "Provided Email is not valid" })
  @Trim()
  public email: string;

  @IsString()
  public age: string;
}
