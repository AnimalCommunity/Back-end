import { Column, Unique } from 'typeorm';

export class TreatmentTypeORM {
  @Column('varchar', { name: 'treatment', length: 255, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): TreatmentTypeORM {
    return new TreatmentTypeORM(value);
  }
}