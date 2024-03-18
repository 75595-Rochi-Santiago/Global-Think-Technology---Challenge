import { User } from "entities/user.entity";
import { usersMock } from "./mock/users.mock";

export default class UserStore {
  private static instance: UserStore;
  private users: User[];

  private constructor() {}

  public static getStorage(): UserStore {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
      UserStore.instance.mockStorage(usersMock);
    }
    return UserStore.instance;
  }

  private mockStorage(mock: User[]) {
    this.users = mock.slice();
  }

  private findIndexByID(id: number): number {
    const index: number = this.users.indexOf(
      this.users.find((user) => user.id === id),
    );
    return index;
  }
  public isValidateEmail(email: string, id?: number): boolean {
    if (id) {
      return !this.users.some((user) => user.email === email && user.id !== id);
    }
    return !this.users.some((user) => user.email === email);
  }

  public createUser(user: User): User {
    user.id = this.users[this.users.length - 1].id + 1;
    this.users.push(user);
    return user;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public findUserByID(id: number): User[] {
    return this.users.splice(this.findIndexByID(id), 1);
  }

  public updateUserByID(
    id: number,
    name?: string,
    email?: string,
    age?: string,
  ): User {
    const index = this.findIndexByID(id);
    if (name) this.users[index].name = name;
    if (email) this.users[index].email = email;
    if (age) this.users[index].age = age;
    return this.users[index];
  }

  public deleteUser(id: number): User {
    const index = this.findIndexByID(id);
    return this.users.splice(index, 1)[0];
  }
}
