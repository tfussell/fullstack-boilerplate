import {readFile as readFileCb} from "fs";
import {resolve as resolvePath} from "path";
import {MigrationInterface, QueryRunner} from "typeorm";
import {promisify} from "util";

const readFile = promisify(readFileCb);

interface ILocationData {
    created_at: string;
    latitude: number;
    longitude: number;
    speed: number;
    user_id: string;
    is_moving: boolean;
    activity_type: string;
    battery_level: number;
}

interface IOrderData {
    id: string;
    runner_id: string;
    picked_up_at: string;
    dropoff_time: string;
}

interface IUserData {
    id: string;
    signup_date: string;
    first_name: string;
    last_name: string;
    phone_brand: string;
    phone_carrier: string;
    phone_model: string;
    transport_mode: string;
}

interface IShiftData {
    id: string;
    start: string;
    stop: string;
    user_id: string;
    role: string;
}

export class MigrateData1555359777701 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const ordersFile = resolvePath(__dirname, "../../../data/challenge_data/week_data/orders_week.json");
        await this.loadJson<IOrderData>(queryRunner, "order", ordersFile, (order) => {
            // tslint:disable-next-line: max-line-length
            return `('${order.id}','${order.runner_id}','${order.picked_up_at}','${order.dropoff_time}')`;
        });
        const shiftsFile = resolvePath(__dirname, "../../../data/challenge_data/week_data/shifts_week.json");
        await this.loadJson<IShiftData>(queryRunner, "shift", shiftsFile, (shift) => {
            // tslint:disable-next-line: max-line-length
            return `('${shift.id}','${shift.start}','${shift.stop}','${shift.user_id}','${shift.role}')`;
        });
        const usersFile = resolvePath(__dirname, "../../../data/challenge_data/week_data/users_week.json");
        await this.loadJson<IUserData>(queryRunner, "user", usersFile, (user) => {
            // tslint:disable-next-line: max-line-length
            return `('${user.id}','${user.signup_date}','${user.first_name}','${user.last_name}','${user.phone_brand}','${user.phone_carrier}','${user.phone_model}','${user.transport_mode}')`;
        });
        const locationsFile = resolvePath(__dirname, "../../../data/challenge_data/week_data/locations_week.json");
        await this.loadJson<ILocationData>(queryRunner, "location", locationsFile, (location, i) => {
            // tslint:disable-next-line: max-line-length
            return `(${i},'${location.created_at}',${location.latitude},${location.longitude},${location.speed},'${location.user_id}',${location.is_moving},'${location.activity_type}',${location.battery_level})`;
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM "user"`);
        await queryRunner.query(`DELETE FROM "shift"`);
        await queryRunner.query(`DELETE FROM "order"`);
        await queryRunner.query(`DELETE FROM "location"`);
    }

    private async loadJson<T>(
        queryRunner: QueryRunner,
        table: string,
        path: string,
        transform: (t: T, i: number) => string,
    ): Promise<void> {
        const locations = JSON.parse(await readFile(path, "utf8")) as T[];
        const batchSize = 1000;
        for (let i = 0; i < locations.length / batchSize; i++) {
            const values = locations
                .slice(i * batchSize, (i + 1) * batchSize)
                .map((item, j) => transform(item, i * batchSize + j + 1));
            await queryRunner.query(`INSERT INTO "${table}" VALUES ${values} ON CONFLICT DO NOTHING`);
        }
    }

}
