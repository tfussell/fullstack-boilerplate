import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  /**
   * Unique Identifier
   */
  @PrimaryColumn({ length: 36 })
  public id!: string;

  /**
   * Date of updated
   */
  @Column("timestamp")
  public signupDate!: Date;

  /**
   * Date of updated
   */
  @Column({ length: 50 })
  public firstName!: string;

  /**
   * Date of updated
   */
  @Column({ length: 50 })
  public lastName!: string;

  /**
   * Date of updated
   */
  @Column({ length: 20 })
  public phoneBrand!: string;

  /**
   * Date of updated
   */
  @Column({ length: 20 })
  public phoneCarrier!: string;

  /**
   * Date of updated
   */
  @Column({ length: 20 })
  public phoneModel!: string;

  /**
   * Date of updated
   */
  @Column({ length: 20 })
  public transportMode!: string;
}
