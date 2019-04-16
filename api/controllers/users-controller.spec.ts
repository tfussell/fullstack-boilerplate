import { expect } from "chai";
import { initializeDbConnection } from "../config/postgres";
import { UsersController } from "./users-controller";

describe("UsersController", () => {
  const controller = new UsersController();

  before(() => initializeDbConnection());

  it("should return something", async () => {
    const users = await controller.Get();
    expect(users.length).to.be.greaterThan(1);
  });
});
