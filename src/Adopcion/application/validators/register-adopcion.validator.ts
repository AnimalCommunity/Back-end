import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdopcionTypeORM } from "../../infrastructure/persistence/typeorm/entities/adopcion.typeorm";
import { Repository } from "typeorm";
import { RegisterAdopcionRequestDto } from "../dtos/request/register-adopcion-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from 'typescript-result';
import { Email } from '../../domain/value-objects/email-value';

@Injectable()
export class RegisterAdopcionValidator {
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>
  ) {}

  public async validate(
    registerAdopcionRequestDto: RegisterAdopcionRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const name: string = registerAdopcionRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Adopcion name is required', null);
    }
    const lastName: string = registerAdopcionRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Adopcion lastName is required', null);
    }

    const password: string = registerAdopcionRequestDto.password.trim();
    if (password.length <= 0) {
      notification.addError('Adopcion password is required', null);
    }

    const email: string = registerAdopcionRequestDto.email.trim();
    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    //const age: number = registerAdopcionRequestDto.age;
    /*if (age <= 17) {
      notification.addError('Age is not valid', null);
    }*/

    if(notification.hasErrors()) {
      return notification;
    }

    const adopcion: AdopcionTypeORM =
      await this.adopcionRepository.
      createQueryBuilder()
        .where("email = :email", {email})
        .getOne();

    if(adopcion != null) {
      notification.addError('Adopcion email is taken', null);
    }

    return notification;
  }
}