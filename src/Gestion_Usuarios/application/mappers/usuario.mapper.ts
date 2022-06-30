import { UsuarioTypeORM } from "../../infrastructure/persistence/typeorm/entities/usuario.typeorm";
import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/usuario-id.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { AgeTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/age.typeorm';
import { PasswordTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

export class UsuarioMapper {
  public static toTypeORM(usuario: Usuario): UsuarioTypeORM {
    const usuarioTypeORM: UsuarioTypeORM = new UsuarioTypeORM();

    usuarioTypeORM.id = UsuarioIdTypeORM.from(usuario.getId().getValue());
    usuarioTypeORM.name = usuario.getName();
    usuarioTypeORM.lastName = usuario.getLastName();
    usuarioTypeORM.email = EmailTypeORM.from(usuario.getEmail().getValue());
    (usuarioTypeORM.password = PasswordTypeORM.from(
      usuario.getPassword().getValue(),
    ));
      /*(usuarioTypeORM.age = AgeTypeORM.from(usuario.getAge().getAge()))*/;
    return usuarioTypeORM;
  }
}
