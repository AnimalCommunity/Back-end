import { Email } from '../../../domain/value-objects/email-value';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Password } from '../../../../common/domain/value-objects/password.value';
import { AdopcionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/adopcion.typeorm';
import { AdopcionId } from '../../../domain/value-objects/Adopcion-id.value';
import { Result } from 'typescript-result';
//import { Age } from '../../../domain/value-objects/age.value';
import { AdopcionFactory } from '../../../domain/factories/adopcion.factory';
import { Adopcion } from '../../../domain/entities/adopcion.entity';
import { AdopcionMapper } from '../../mappers/adopcion.mapper';
import { UpdateAdopcionCommand } from '../../commands/update-adopcion.command';

@CommandHandler(UpdateAdopcionCommand)
export class UpdateAdopcionHandler
  implements ICommandHandler<UpdateAdopcionCommand>
{
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>,
  ) {}

  async execute(command: UpdateAdopcionCommand) {
    const idResult: AdopcionId = AdopcionId.create(command.id);

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

    const mother: Adopcion = AdopcionFactory.withId(
      idResult,
      command.name,
      command.lastName,
      emailResult.value,
      passwordResult.value,
      //ageResult.value,
    );

    const motherTypeORM = AdopcionMapper.toTypeORM(mother);
    await this.adopcionRepository.update(command.targetId, motherTypeORM);

    return motherTypeORM;
  }
}
