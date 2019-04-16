import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Order {
  /**
   * Unique Identifier
   */
  @PrimaryColumn({ length: 36 })
  public id!: string;

  /**
   * Date of updated
   */
  @Column({ length: 17 })
  public runnerId!: string;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public pickedUpAt!: Date;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public dropoffTime!: Date;
}
