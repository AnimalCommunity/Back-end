import { Column, Entity, Unique } from "typeorm";
import { UsuarioIdTypeORM } from "./usuario.id.typeorm";
import { EmailTypeORM } from "src/common/infrastructure/persistence/typeorm/entities/email.typeorm";
import { PasswordTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/Password.typeorm';

@Entity('usuario')
@Unique('UQ_usuario_email', ['email.value'])
export class UsuarioTypeORM {
  @Column((type) => UsuarioIdTypeORM, { prefix: false })
  public id: UsuarioIdTypeORM;

  @Column('varchar', { name: 'name', length: 75, nullable: false })
  public name: string;

  @Column('varchar', { name: 'last_name', length: 75, nullable: false })
  public lastName: string;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

}