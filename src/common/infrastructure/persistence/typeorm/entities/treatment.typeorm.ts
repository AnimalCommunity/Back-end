import { Column } from "typeorm";

export class TreatmentTypeORM {
  @Column('varchar', {name: 'treatment', length: 100, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): TreatmentTypeORM {
    return new TreatmentTypeORM(value);
  }
}