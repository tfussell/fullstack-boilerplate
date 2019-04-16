import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrateSchema1555359777701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: max-line-length
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "speed" double precision NOT NULL, "userId" character varying(17) NOT NULL, "isMoving" boolean NOT NULL, "activityType" character varying(20) NOT NULL, "batteryLevel" double precision NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        // tslint:disable-next-line: max-line-length
        await queryRunner.query(`CREATE TABLE "order" ("id" character varying(36) NOT NULL, "runnerId" character varying(17) NOT NULL, "pickedUpAt" TIMESTAMP NOT NULL, "dropoffTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        // tslint:disable-next-line: max-line-length
        await queryRunner.query(`CREATE TABLE "shift" ("id" character varying(36) NOT NULL, "start" TIMESTAMP NOT NULL, "stop" TIMESTAMP NOT NULL, "userId" character varying(17) NOT NULL, "role" character varying(20) NOT NULL, CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`);
        // tslint:disable-next-line: max-line-length
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying(36) NOT NULL, "signupDate" TIMESTAMP NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "phoneBrand" character varying(20) NOT NULL, "phoneCarrier" character varying(20) NOT NULL, "phoneModel" character varying(20) NOT NULL, "transportMode" character varying(20) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "shift"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
