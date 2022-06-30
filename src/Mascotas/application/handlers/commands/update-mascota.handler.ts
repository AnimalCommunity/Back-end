import { Treatment } from '../../../domain/value-objects/treatment-value';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Disease } from '../../../../common/domain/value-objects/disease.value';
import { MascotaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mascota.typeorm';
import { MascotaId } from '../../../domain/value-objects/Mascota-id.value';
import { Result } from 'typescript-result';
//import { Age } from '../../../domain/value-objects/age.value';
import { MascotaFactory } from '../../../domain/factories/mascota.factory';
import { Mascota } from '../../../domain/entities/mascota.entity';
import { MascotaMapper } from '../../mappers/mascota.mapper';
import { UpdateMascotaCommand } from '../../commands/update-mascota.command';

@CommandHandler(UpdateMascotaCommand)
export class UpdateMascotaHandler
  implements ICommandHandler<UpdateMascotaCommand>
{
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>,
  ) {}

  async execute(command: UpdateMascotaCommand) {
    const idResult: MascotaId = MascotaId.create(command.id);

    const treatmentResult: Result<AppNotification, Treatment> = Treatment.create(command.treatment);
    if (treatmentResult.isFailure()) {
      return null;
    }

    const diseaseResult: Result<AppNotification, Disease> = Disease.create(
      command.disease,
    );

    if (diseaseResult.isFailure()) {
      return null;
    }

/*    const ageResult: Result<AppNotification, Age> = Age.create(
      command.age,
    );*/

    /*if (ageResult.isFailure()) {
      return null;
    }*/

    const mascota: Mascota = MascotaFactory.withId(
      idResult,
      command.name,
      command.species,
      treatmentResult.value,
      diseaseResult.value,
      //ageResult.value,
    );

    const mascotaTypeORM = MascotaMapper.toTypeORM(mascota);
    await this.mascotaRepository.update(command.targetId, mascotaTypeORM);

    return mascotaTypeORM;
  }
}
