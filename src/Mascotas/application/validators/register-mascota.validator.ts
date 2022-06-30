import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MascotaTypeORM } from "../../infrastructure/persistence/typeorm/entities/mascota.typeorm";
import { Repository } from "typeorm";
import { RegisterMascotaRequestDto } from "../dtos/request/register-mascota-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from 'typescript-result';
import { Treatment } from '../../domain/value-objects/treatment-value';

@Injectable()
export class RegisterMascotaValidator {
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>
  ) {}

  public async validate(
    registerMascotaRequestDto: RegisterMascotaRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const name: string = registerMascotaRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Mascota name is required', null);
    }
    const species: string = registerMascotaRequestDto.species.trim();
    if (species.length <= 0) {
      notification.addError('Mascota species is required', null);
    }

    const disease: string = registerMascotaRequestDto.disease.trim();
    if (disease.length <= 0) {
      notification.addError('Mascota disease is required', null);
    }

    const treatment: string = registerMascotaRequestDto.treatment.trim();
    const treatmentResult: Result<AppNotification, Treatment> = Treatment.create(treatment);

    if (treatmentResult.isFailure()) {
      notification.addErrors(treatmentResult.error.getErrors());
    }

    //const age: number = registerMascotaRequestDto.age;
    /*if (age <= 17) {
      notification.addError('Age is not valid', null);
    }*/

    if(notification.hasErrors()) {
      return notification;
    }

    const mascota: MascotaTypeORM =
      await this.mascotaRepository.
      createQueryBuilder()
        .where("treatment = :treatment", {treatment})
        .getOne();

    if(mascota != null) {
      notification.addError('Mascota treatment is taken', null);
    }

    return notification;
  }
}