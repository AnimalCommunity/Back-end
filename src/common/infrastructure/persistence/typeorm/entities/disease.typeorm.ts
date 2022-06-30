import { Column } from 'typeorm';

export class DiseaseTypeORM {
  @Column('varchar', { name: 'disease', length: 15, nullable: false })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): DiseaseTypeORM {
    return new DiseaseTypeORM(value);
  }
}