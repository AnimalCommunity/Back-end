import { UsuarioTypeORM } from "../../infrastructure/persistence/typeorm/entities/usuario.typeorm";
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/usuario-id.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { AgeTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/age.typeorm';
import { PasswordTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

export class UsuarioMapper {
  public static toTypeORM(mother: Usuario): UsuarioTypeORM {
    const usuarioTypeORM: UsuarioTypeORM = new UsuarioTypeORM();

    usuarioTypeORM.id = UsuarioIdTypeORM.from(mother.getId().getValue());
    usuarioTypeORM.name = mother.getName();
    usuarioTypeORM.lastName = mother.getLastName();
    usuarioTypeORM.email = EmailTypeORM.from(mother.getEmail().getValue());
    (usuarioTypeORM.password = PasswordTypeORM.from(
      mother.getPassword().getValue(),
    ));
      /*(usuarioTypeORM.age = AgeTypeORM.from(mother.getAge().getAge()))*/;
    return usuarioTypeORM;
  }
}
