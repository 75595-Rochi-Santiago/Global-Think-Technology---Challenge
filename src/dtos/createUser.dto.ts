import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";
import { Trim } from "class-sanitizer";

export default class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Trim()
  public name: string;

  @IsEmail({}, { message: "Provided Email is not valid" })
  @MaxLength(50)
  @Trim()
  public email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  public age: string;
}
