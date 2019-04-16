import { expect } from "chai";
import { initializeDbConnection } from "../config/postgres";
import { LocationsController } from "./locations-controller";

describe("LocationsController", () => {
  const controller = new LocationsController();

  before(() => initializeDbConnection());

  it("should return something", async () => {
    const locations = await controller.Get(10);
    expect(locations.length).to.be.equal(10);
  });
});
