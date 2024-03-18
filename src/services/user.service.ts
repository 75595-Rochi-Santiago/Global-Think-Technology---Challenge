import { HTTPStatusCode } from "../errors/HttpCode.enum";
import { User } from "../entities/user.entity";
import UserStore from "../storage/userStore";
import createError from "http-errors";
import { BadRequestException } from "../errors/Http.exceptions";

export default class UserService {
  private storage = UserStore.getStorage();
  public async createUser(user: User): Promise<User> {
    if (this.storage.isValidateEmail(user.email)) {
      this.storage.createUser(user);
      return user;
    }
    throw createError(HTTPStatusCode.Conflict, "Email alredy exists");
  }
  public async getAllUsers(): Promise<User[]> {
    return this.storage.getUsers();
  }
  public async findUserByID(id: number): Promise<User[]> {
    return this.storage.findUserByID(id);
  }
  public async updateUser(
    id: number,
    name?: string,
    email?: string,
    age?: string,
  ): Promise<User> {
    if (!id) {
      throw new BadRequestException();
    }
    if (email) {
      if (!this.storage.isValidateEmail(email, id)) {
        throw createError(HTTPStatusCode.Conflict, "Email alredy exists");
      }
    }
    return this.storage.updateUserByID(id, name, email, age);
  }
  public async deleteUser(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException();
    }
    return this.storage.deleteUser(id);
  }
}
