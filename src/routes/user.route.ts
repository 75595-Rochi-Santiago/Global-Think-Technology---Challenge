import { Router } from "express";
import UserController from "../controllers/user.controller";
import Route from "../interfaces/route.interface";
import dtoValidationMiddleware from "../middlewares/dtoValidation.middleware";
import CreateUserDto from "../dtos/createUser.dto";
import UpdateUser from "../dtos/updateUser.dto";

export default class UserRoute implements Route {
  public path = "/users";
  public router = Router();
  public usersController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      dtoValidationMiddleware(CreateUserDto),
      this.usersController.createUser,
    );
    this.router.get(`${this.path}`, this.usersController.getAllUsers);
    this.router.patch(
      `${this.path}/:id`,
      dtoValidationMiddleware(UpdateUser),
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}
