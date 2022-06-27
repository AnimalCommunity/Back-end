import { Column } from "typeorm";

export class AgeTypeORM {
  @Column('int', {name: 'age', nullable: false })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): AgeTypeORM {
    return new AgeTypeORM(value);
  }
}