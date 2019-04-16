import { Get, Route, Tags } from "tsoa";
import { getRepository } from "typeorm";

import { User } from "../database/entities/user";
import { ServerError } from "../utils/server-error";
import { connection } from "../config/postgres";
import { Shift } from "../database/entities/shift";

@Route("users")
export class UsersController {
  @Get()
  @Tags("Users")
  public async Get(): Promise<User[]> {
    const repository = connection.getRepository(User);
    return repository.find();
  }

  @Get("{userId}/shifts")
  @Tags("Users")
  public async GetUserShifts(userId: string): Promise<Shift[]> {
    const repository = connection.getRepository(Shift);
    const shifts = await repository.find({
      userId,
    });
    return shifts;
  }

  @Get("{userId}")
  @Tags("Users")
  public async GetUser(userId: string): Promise<User> {
    const repository = getRepository(User);
    const user = await repository.findOne({
      id: userId,
    });
    if (!user) {
      throw new ServerError(`no user found with id ${userId}`);
    }
    return user;
  }
}
