import { Email } from '../value-objects/email-value';
//import { Age } from '../value-objects/age.value';
import { Adopcion } from '../entities/adopcion.entity';
import { AdopcionId } from '../value-objects/adopcion-id.value';
import { Password } from '../../../common/domain/value-objects/password.value';

export class AdopcionFactory {
  public static createFrom(
    name: string,
    lastName: string,
    email: Email,
    password: Password,
    //age: Age
  ): Adopcion {
    return new Adopcion(
      AdopcionId.create(0),
      name,
      lastName,
      email,
      password,
      /*age*/);
  }

  public static withId(adopcionId: AdopcionId, name: string, lastName: string, email: Email, password: Password/*, age: Age*/): Adopcion {
    return new Adopcion(adopcionId, name, lastName, email, password/*, age*/);
  }
}