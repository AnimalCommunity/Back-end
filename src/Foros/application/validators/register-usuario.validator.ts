import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioTypeORM } from "../../infrastructure/persistence/typeorm/entities/usuario.typeorm";
import { Repository } from "typeorm";
import { RegisterUsuarioRequestDto } from "../dtos/request/register-usuario-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from 'typescript-result';
import { Email } from '../../domain/value-objects/email-value';

@Injectable()
export class RegisterUsuarioValidator {
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>
  ) {}

  public async validate(
    registerUsuarioRequestDto: RegisterUsuarioRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const name: string = registerUsuarioRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Usuario name is required', null);
    }
    const lastName: string = registerUsuarioRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Usuario lastName is required', null);
    }

    const password: string = registerUsuarioRequestDto.password.trim();
    if (password.length <= 0) {
      notification.addError('Usuario password is required', null);
    }

    const email: string = registerUsuarioRequestDto.email.trim();
    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    //const age: number = registerUsuarioRequestDto.age;
    /*if (age <= 17) {
      notification.addError('Age is not valid', null);
    }*/

    if(notification.hasErrors()) {
      return notification;
    }

    const usuario: UsuarioTypeORM =
      await this.usuarioRepository.
      createQueryBuilder()
        .where("email = :email", {email})
        .getOne();

    if(usuario != null) {
      notification.addError('Usuario email is taken', null);
    }

    return notification;
  }
}