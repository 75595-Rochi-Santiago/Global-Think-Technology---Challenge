import { IsNumber } from "class-validator";

export default class DeleteUserDto {
  @IsNumber()
  public id: number;
}
