import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Shift {
  /**
   * Unique Identifier
   */
  @PrimaryColumn({ length: 36 })
  public id!: string;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public start!: Date;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public stop!: Date;

  /**
   * Date of updated
   */
  @Column({ length: 17 })
  public userId!: string;

  /**
   * Date of updated
   */
  @Column({ length: 20 })
  public role!: string;
}
