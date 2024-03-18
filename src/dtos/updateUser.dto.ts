import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from "class-validator";

import { Trim } from "class-sanitizer";

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Trim()
  public name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Provided Email is not valid" })
  @MaxLength(50)
  @Trim()
  public email?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @Trim()
  public age?: string;
}
