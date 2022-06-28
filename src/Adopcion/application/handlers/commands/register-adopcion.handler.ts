import { RegisterAdopcionCommand } from '../../commands/register-adopcion.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { AdopcionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/adopcion.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Email } from '../../../domain/value-objects/email-value';
import { Result } from 'typescript-result';
//import { Age } from '../../../domain/value-objects/age.value';
import { AdopcionFactory } from '../../../domain/factories/adopcion.factory';
import { Adopcion } from '../../../domain/entities/adopcion.entity';
import { AdopcionMapper } from '../../mappers/adopcion.mapper';
import { AdopcionId } from '../../../domain/value-objects/adopcion-id.value';
import { Password } from '../../../../common/domain/value-objects/password.value';

@CommandHandler(RegisterAdopcionCommand)
export class RegisterAdopcionHandler
  implements ICommandHandler<RegisterAdopcionCommand>
{
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterAdopcionCommand) {
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

    let adopcion: Adopcion = AdopcionFactory.createFrom(
      command.name,
      command.lastName,
      emailResult.value,
      passwordResult.value,
      //ageResult.value
    );

    let adopcionTypeORM = AdopcionMapper.toTypeORM(adopcion);
    adopcionTypeORM = await this.adopcionRepository.save(adopcionTypeORM);

    if (adopcionTypeORM == null) {
      return 0;
    }

    const motherId: number = Number(adopcionTypeORM.id.value);
    adopcion.changeId(AdopcionId.create(motherId));

    adopcion = this.publisher.mergeObjectContext(adopcion);
    adopcion.register();
    adopcion.commit();

    return motherId;
  }
}