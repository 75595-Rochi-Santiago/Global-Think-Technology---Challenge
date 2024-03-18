import { Request, Response } from "express";
import UserService from "../services/user.service";
import { User } from "../entities/user.entity";

export default class UserController {
  public userService = new UserService();

  public createUser = async (req: Request, res: Response) => {
    console.log("en controlador---", req.body);
    const newUserData: User = await this.userService.createUser(req.body);
    res
      .status(200)
      .json({ data: newUserData, message: "User create sucessafully" });
  };
}
