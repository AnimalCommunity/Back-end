import { Column } from "typeorm";

export class EmailTypeORM {
  @Column('varchar', {name: 'email', length: 100, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): EmailTypeORM {
    return new EmailTypeORM(value);
  }
}