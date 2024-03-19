import { Request, Response } from "express";
import UserService from "../services/user.service";
import { User } from "../entities/user.entity";
import { SuccessMessages } from "../errors/SucessMessages.enum";
import { HTTPStatusCode } from "../errors/HttpCode.enum";

export default class UserController {
  public userService = new UserService();

  public createUser = async (req: Request, res: Response) => {
    const newUserData: User = await this.userService.createUser(req.body);
    res
      .status(HTTPStatusCode.Created)
      .json({ data: newUserData, message: SuccessMessages.CreateSuccess });
  };
  public getAllUsers = async (req: Request, res: Response) => {
    const users: User[] = await this.userService.getAllUsers();
    res
      .status(HTTPStatusCode.Ok)
      .json({ data: users, message: SuccessMessages.GetSuccess });
  };
  public findUserByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    const users: User = await this.userService.findUserByID(Number(id));
    res
      .status(HTTPStatusCode.Ok)
      .json({ data: users, message: SuccessMessages.GetSuccess });
  };
  public updateUser = async (req: Request, res: Response) => {
    const { name, email, age } = req.body;
    const { id } = req.params;
    const user: User = await this.userService.updateUser(
      Number(id),
      name,
      email,
      age,
    );
    res
      .status(HTTPStatusCode.Ok)
      .json({ data: user, message: SuccessMessages.UpdateSuccess });
  };
  public deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const users: User = await this.userService.deleteUser(Number(id));
    res
      .status(HTTPStatusCode.Ok)
      .json({ data: users, message: SuccessMessages.DeleteSuccess });
  };
}
