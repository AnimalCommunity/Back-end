import { Column, Unique } from 'typeorm';

export class EmailTypeORM {
  @Column('varchar', { name: 'email', length: 255, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): EmailTypeORM {
    return new EmailTypeORM(value);
  }
}