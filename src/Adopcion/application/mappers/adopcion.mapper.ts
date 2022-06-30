import { AdopcionTypeORM } from "../../infrastructure/persistence/typeorm/entities/adopcion.typeorm";
import { Adopcion } from '../../domain/entities/adopcion.entity';
import { AdopcionIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/adopcion-id.typeorm';
import { EmailTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/email.typeorm';
import { AgeTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/age.typeorm';
import { PasswordTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/password.typeorm';

export class AdopcionMapper {
  public static toTypeORM(mother: Adopcion): AdopcionTypeORM {
    const adopcionTypeORM: AdopcionTypeORM = new AdopcionTypeORM();

    adopcionTypeORM.id = AdopcionIdTypeORM.from(mother.getId().getValue());
    adopcionTypeORM.name = mother.getName();
    adopcionTypeORM.lastName = mother.getLastName();
    adopcionTypeORM.email = EmailTypeORM.from(mother.getEmail().getValue());
    (adopcionTypeORM.password = PasswordTypeORM.from(
      mother.getPassword().getValue(),
    ));
      /*(adopcionTypeORM.age = AgeTypeORM.from(mother.getAge().getAge()))*/;
    return adopcionTypeORM;
  }
}
