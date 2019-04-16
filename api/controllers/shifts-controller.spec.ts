import { expect } from "chai";
import { initializeDbConnection } from "../config/postgres";
import { ShiftsController } from "./shifts-controller";

describe("ShiftsController", () => {
  const controller = new ShiftsController();

  before(() => initializeDbConnection());

  it("should return something", async () => {
    const shifts = await controller.Get();
    expect(shifts.length).to.be.greaterThan(1);
  });
});
