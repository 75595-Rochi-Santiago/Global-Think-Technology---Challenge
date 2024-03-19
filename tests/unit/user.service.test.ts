import UserService from "../../src/services/user.service";
import { newUserMock, existUserMock } from "../mocks/user.model.mock";
import UserStore from "../../src/storage/userStore";
import { HTTPStatusCode } from "../../src/errors/HttpCode.enum";

describe("Create User - UserService, UserStorage", () => {
  const userService = new UserService();
  const storage = UserStore.getStorage();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("create user sucessfully", async () => {
    const expected = await userService.createUser(newUserMock);
    expect(expected).toMatchObject(newUserMock);
  });
  it("create user with repeated email", async () => {
    try {
      const t = await userService.createUser(existUserMock);
    } catch (error) {
      expect(error.status).toBe(HTTPStatusCode.Conflict);
      expect(error.message).toBe("Email alredy exists");
    }
  });
  it("store new user", () => {
    const storedUser = storage.createUser(newUserMock);
    const user = storage.findUserByID(storedUser.id);
    expect(storedUser).toMatchObject(user);
  });
});
