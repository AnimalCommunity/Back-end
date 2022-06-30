import { Email } from '../../../domain/value-objects/email-value';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { UsuarioTypeORM } from '../../../infrastructure/persistence/typeorm/entities/usuario.typeorm';
import { UsuarioId } from '../../../domain/value-objects/Usuario-id.value';
import { Result } from 'typescript-result';
//import { Age } from '../../../domain/value-objects/age.value';
import { UsuarioFactory } from '../../../domain/factories/usuario.factory';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { UpdateUsuarioCommand } from '../../commands/update-usuario.command';

@CommandHandler(UpdateUsuarioCommand)
export class UpdateUsuarioHandler
  implements ICommandHandler<UpdateUsuarioCommand>
{
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>,
  ) {}

  async execute(command: UpdateUsuarioCommand) {
    const idResult: UsuarioId = UsuarioId.create(command.id);

    const emailResult: Result<AppNotification, Email> = Email.create(command.email);
    if (emailResult.isFailure()) {
      return null;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return null;
    }

/*    const ageResult: Result<AppNotification, Age> = Age.create(
      command.age,
    );*/

    /*if (ageResult.isFailure()) {
      return null;
    }*/

    const usuario: Usuario = UsuarioFactory.withId(
      idResult,
      command.name,
      command.lastName,
      emailResult.value,
      passwordResult.value,
      //ageResult.value,
    );

    const usuarioTypeORM = UsuarioMapper.toTypeORM(usuario);
    await this.usuarioRepository.update(command.targetId, usuarioTypeORM);

    return usuarioTypeORM;
  }
}
