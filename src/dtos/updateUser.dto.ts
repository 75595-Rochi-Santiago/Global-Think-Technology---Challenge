import { IsString, IsEmail, IsOptional } from "class-validator";
import { Trim } from "class-sanitizer";

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Trim()
  public name?: string;

  @IsOptional()
  @IsString()
  @IsEmail({}, { message: "Provided Email is not valid" })
  @Trim()
  public email?: string;

  @IsOptional()
  @IsString()
  public age?: string;
}
