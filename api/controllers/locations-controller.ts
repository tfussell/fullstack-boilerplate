import { Get, Route, Tags, Query } from "tsoa";
import { Between, In } from "typeorm";

import { connection } from "../config/postgres";
import { Location } from "../database/entities/location";
import { Shift } from "../database/entities/shift";

export interface ILocationStats {
  average: number;
  count: number;
  sum: number;
  min: number | null;
  max: number | null;
}

export interface IUserStats {
  [key: string]: ILocationStats;
}

function calcShiftStats(locations: Location[]): ILocationStats {
  const results: ILocationStats = {
    average: 0,
    count: 0,
    max: null,
    min: null,
    sum: 0,
  };
  if (locations.length === 0) {
    return results;
  }
  let prev: Location | null = null;
  const sorted = locations.sort((a: Location, b: Location) => a.createdAt.getTime() - b.createdAt.getTime())
  for (const location of sorted) {
    if (prev) {
      const difference = (location.createdAt.getTime() - prev.createdAt.getTime()) / 1000;
      results.sum += difference;
      if (results.max === null || difference > results.max) {
        results.max = difference;
      }
      if (results.min === null || difference < results.min) {
        results.min = difference;
      }
      results.count++;
    }
    prev = location;
  }
  results.average = Math.round(results.sum / results.count);
  results.max = results.max && Math.round(results.max);
  results.min = results.min && Math.round(results.min);
  return results;
}

function calcStats(shifts: Shift[], locations: Location[]): ILocationStats {
  const results: ILocationStats = {
    average: 0,
    count: 0,
    max: null,
    min: null,
    sum: 0,
  };
  if (shifts.length === 0 || locations.length === 0) {
    return results;
  }
  for (const shift of shifts) {
    const shiftLocations = locations.filter((location) =>
      location.createdAt.getTime() >= shift.start.getTime()
      && location.createdAt.getTime() <= shift.stop.getTime());
    const shiftStats = calcShiftStats(shiftLocations);
    results.sum += shiftStats.sum;
    if (results.max === null || (shiftStats.max !== null && shiftStats.max > results.max)) {
      results.max = shiftStats.max;
    }
    if (results.min === null || (shiftStats.min !== null && shiftStats.min < results.min)) {
      results.min = shiftStats.min;
    }
    results.count += shiftStats.count;
  }
  results.average = Math.round(results.sum / results.count);
  results.max = results.max && Math.round(results.max);
  results.min = results.min && Math.round(results.min);
  return results;
}

@Route("locations")
export class LocationsController {
  @Get()
  @Tags("Locations")
  public async Get(@Query("limit") limit: number): Promise<Location[]> {
    const repository = connection.getRepository(Location);
    const locations = await repository.find({
      take: limit,
    });
    return locations;
  }

  @Get("stats")
  @Tags("Locations")
  public async GetStatsByUsers(@Query("userIds") userIds: string[]): Promise<IUserStats> {
    const locations = await connection.getRepository(Location).find({
      userId: In(userIds),
    });
    const shifts = await connection.getRepository(Shift).find({
      userId: In(userIds),
    });
    const results: {[key: string]: ILocationStats} = {};
    for (const userId of userIds) {
      const userShifts = shifts.filter((s) => s.userId === userId);
      const userLocations = locations.filter((s) => s.userId === userId);
      results[userId] = calcStats(userShifts, userLocations);
    }
    return results;
  }

  @Get("{userId}/stats")
  @Tags("Locations")
  public async GetStatsByUser(userId: string): Promise<ILocationStats> {
    const locations = await connection.getRepository(Location).find({
      userId,
    });
    const shifts = await connection.getRepository(Shift).find({
      userId,
    });
    return calcStats(shifts, locations);
  }

  @Get("{userId}/{shiftId}/stats")
  @Tags("Locations")
  public async GetStatsByUserShift(userId: string, shiftId: string): Promise<ILocationStats> {
    const shift = await connection.getRepository(Shift).findOne({
      id: shiftId,
    });
    if (!shift) {
      throw new Error("shift not found");
    }
    const locations = await connection.getRepository(Location).find({
      createdAt: Between(shift.start.toISOString(), shift.stop.toISOString()),
      userId,
    });
    return calcStats([shift], locations);
  }
}
