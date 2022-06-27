import { Column } from "typeorm";

export class LastNameTypeORM {
  @Column('varchar', {name: 'last_name', length: 75, nullable: false })
  public lastName: string;

  private constructor(lastName: string) {
    this.lastName = lastName;
  }

  public static from(lastName: string): LastNameTypeORM {
    return new LastNameTypeORM(lastName);
  }
}