import { Column, Entity, Unique } from "typeorm";
import { AdopcionIdTypeORM } from "../value-objects/adopcion-id.typeorm";
import { EmailTypeORM } from "src/common/infrastructure/persistence/typeorm/entities/email.typeorm";
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/Password.typeorm';

@Entity('adopcion')
@Unique('UQ_adopcion_email', ['email.value'])
export class AdopcionTypeORM {
  @Column((type) => AdopcionIdTypeORM, { prefix: false })
  public id: AdopcionIdTypeORM;

  @Column('varchar', { name: 'name', length: 75, nullable: false })
  public name: string;

  @Column('varchar', { name: 'last_name', length: 75, nullable: false })
  public lastName: string;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

}