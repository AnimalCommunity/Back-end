import { Email } from '../value-objects/email-value';
//import { Age } from '../value-objects/age.value';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioId } from '../value-objects/usuario-id.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class UsuarioFactory {
  public static createFrom(
    name: string,
    lastName: string,
    email: Email,
    password: Password,
    //age: Age
  ): Usuario {
    return new Usuario(
      UsuarioId.create(0),
      name,
      lastName,
      email,
      password,
      /*age*/);
  }

  public static withId(usuarioId: UsuarioId, name: string, lastName: string, email: Email, password: Password/*, age: Age*/): Usuario {
    return new Usuario(usuarioId, name, lastName, email, password/*, age*/);
  }
}