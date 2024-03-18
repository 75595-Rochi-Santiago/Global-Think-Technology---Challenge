import HttpException from "../exceptions/HttpException";
import { User } from "../entities/user.entity";
import { BadRequestException } from "../errors/http.exceptions";

export default class UserService {
  public async createUser(user: User): Promise<User> {
    return user;
  }
}
