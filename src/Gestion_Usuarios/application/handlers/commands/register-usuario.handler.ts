import { RegisterUsuarioCommand } from '../../commands/register-usuario.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioTypeORM } from '../../../infrastructure/persistence/typeorm/entities/usuario.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Email } from '../../../domain/value-objects/email-value';
import { Result } from 'typescript-result';
//import { Age } from '../../../domain/value-objects/age.value';
import { UsuarioFactory } from '../../../domain/factories/usuario.factory';
import { Usuario } from '../../../domain/entities/usuario.entity';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { UsuarioId } from '../../../domain/value-objects/usuario-id.value';
import { Password } from '../../../../common/domain/value-objects/password.value';

@CommandHandler(RegisterUsuarioCommand)
export class RegisterUsuarioHandler
  implements ICommandHandler<RegisterUsuarioCommand>
{
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUsuarioCommand) {
    const emailResult: Result<AppNotification, Email> = Email.create(command.email);

    if (emailResult.isFailure()) {
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );

    if (passwordResult.isFailure()) {
      return 0;
    }

    console.log(`${passwordResult.value}`);

    /*const ageResult: Result<AppNotification, Age> = Age.create(
      command.age,
    );*/

/*    if (ageResult.isFailure()) {
      return 0;
    }*/

    let usuario: Usuario = UsuarioFactory.createFrom(
      command.name,
      command.lastName,
      emailResult.value,
      passwordResult.value,
      //ageResult.value
    );

    let usuarioTypeORM = UsuarioMapper.toTypeORM(usuario);
    usuarioTypeORM = await this.usuarioRepository.save(usuarioTypeORM);

    if (usuarioTypeORM == null) {
      return 0;
    }

    const usuarioId: number = Number(usuarioTypeORM.id.value);
    usuario.changeId(UsuarioId.create(usuarioId));

    usuario = this.publisher.mergeObjectContext(usuario);
    usuario.register();
    usuario.commit();

    return usuarioId;
  }
}