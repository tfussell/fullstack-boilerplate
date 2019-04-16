import { Get, Route, Tags } from "tsoa";

import { connection } from "../config/postgres";
import { Order } from "../database/entities/order";

@Route("orders")
export class OrdersController {
  @Get()
  @Tags("Orders")
  public async Get(): Promise<Order[]> {
    const repository = connection.getRepository(Order);
    const locations = await repository.find();
    return locations;
  }

  @Get("{userId}")
  @Tags("Orders")
  public async GetByUser(userId: string): Promise<Order[]> {
    const repository = connection.getRepository(Order);
    const locations = await repository.find({
      where: {
        userId,
      },
    });
    return locations;
  }
}
