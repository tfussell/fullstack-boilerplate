import { expect } from "chai";
import { initializeDbConnection } from "../config/postgres";
import { OrdersController } from "./orders-controller";

describe("OrdersController", () => {
  const controller = new OrdersController();

  before(() => initializeDbConnection());

  it("should return something", async () => {
    const orders = await controller.Get();
    expect(orders.length).to.be.greaterThan(1);
  });
});
