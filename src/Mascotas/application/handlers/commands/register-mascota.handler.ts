import { RegisterMascotaCommand } from '../../commands/register-mascota.command';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { MascotaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mascota.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Treatment } from '../../../domain/value-objects/treatment-value';
import { Result } from 'typescript-result';
//import { Age } from '../../../domain/value-objects/age.value';
import { MascotaFactory } from '../../../domain/factories/mascota.factory';
import { Mascota } from '../../../domain/entities/mascota.entity';
import { MascotaMapper } from '../../mappers/mascota.mapper';
import { MascotaId } from '../../../domain/value-objects/mascota-id.value';
import { Disease } from '../../../../common/domain/value-objects/disease.value';

@CommandHandler(RegisterMascotaCommand)
export class RegisterMascotaHandler
  implements ICommandHandler<RegisterMascotaCommand>
{
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterMascotaCommand) {
    
    const treatmentResult: Result<AppNotification, Treatment> = Treatment.create(command.treatment);
    
    if (treatmentResult.isFailure()) {
      return 0;
    }

    const diseaseResult: Result<AppNotification, Disease> = Disease.create(
      command.disease,
    );
    console.log(JSON.stringify(diseaseResult));
    if (diseaseResult.isFailure()) {
      return 0;
    }

    console.log(`${diseaseResult.value}`);

    /*const ageResult: Result<AppNotification, Age> = Age.create(
      command.age,
    );*/

/*    if (ageResult.isFailure()) {
      return 0;
    }*/

    let mascota: Mascota = MascotaFactory.createFrom(
      command.name,
      command.species,
      treatmentResult.value,
      diseaseResult.value,
      //ageResult.value
    );

    let mascotaTypeORM = MascotaMapper.toTypeORM(mascota);
    mascotaTypeORM = await this.mascotaRepository.save(mascotaTypeORM);

    if (mascotaTypeORM == null) {
      return 0;
    }

    const mascotaId: number = Number(mascotaTypeORM.id.value);
    mascota.changeId(MascotaId.create(mascotaId));

    mascota = this.publisher.mergeObjectContext(mascota);
    mascota.register();
    mascota.commit();

    return mascotaId;
  }
}