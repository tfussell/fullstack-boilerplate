import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id!: number;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public createdAt!: Date;

  /**
   * Date of updated
   */
  @Column("float")
  public latitude!: number;

  /**
   * Date of updated
   */
  @Column("float")
  public longitude!: number;

  /**
   * Date of updated
   */
  @Column("float")
  public speed!: number;

  /**
   * Date of updated
   */
  @Column({ length: 17 })
  public userId!: string;

  /**
   * Date of updated
   */
  @Column("bool")
  public isMoving!: boolean;

  /**
   * Date of updated
   */
  @Column({ length: 20 })
  public activityType!: string;

  /**
   * Date of updated
   */
  @Column("float")
  public batteryLevel!: number;
}
