import { Get, Route, Tags } from "tsoa";

import { connection } from "../config/postgres";
import { Shift } from "../database/entities/shift";

@Route("shifts")
export class ShiftsController {
  @Get()
  @Tags("Shifts")
  public async Get(): Promise<Shift[]> {
    const repository = connection.getRepository(Shift);
    const locations = await repository.find();
    return locations;
  }

  @Get("{shiftId}")
  @Tags("Shifts")
  public async GetById(shiftId: string): Promise<Shift> {
    const repository = connection.getRepository(Shift);
    const shift = await repository.findOne({
      where: {
        id: shiftId,
      },
    });
    if (!shift) {
      throw new Error("shift not found");
    }
    return shift;
  }
}
