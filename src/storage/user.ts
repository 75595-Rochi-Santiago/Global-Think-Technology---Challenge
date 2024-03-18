import { User } from "entities/user.entity";

export default class Storage {
  private static instance: Storage;
  private users: [User];

  private constructor() {}

  public static setStorage(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  private findIndexByID(id: number): number {
    const index: number = this.users.indexOf(
      this.users.find((user) => user.id == id),
    );
    return index;
  }

  public createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  public getUsers(): [User] {
    return this.users;
  }

  public findUserByID(id: number): [User] | User[] {
    return this.users.splice(this.findIndexByID(id), 1);
  }

  public updateUserByID(id: number, user: User): User {
    const index = this.findIndexByID(id);
    this.users[index] = user;
    return user;
  }

  public deleteUser(id: number): User[] {
    const index = this.findIndexByID(id);
    return this.users.splice(index, 1);
  }
}
