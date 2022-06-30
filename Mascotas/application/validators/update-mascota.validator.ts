import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MascotaTypeORM } from "../../infrastructure/persistence/typeorm/entities/mascota.typeorm";
import { Treatment } from '../../domain/value-objects/treatment-value';
import { AppNotification } from '../../../common/application/app.notification';
import { Disease } from '../../../common/domain/value-objects/disease.value';
import { Result } from 'typescript-result';
import { UpdateMascotaRequestDto } from '../dtos/request/update-mascota-request.dto';

@Injectable()
export class UpdateMascotaValidator {
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateMascotaRequestDto: UpdateMascotaRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateMascotaRequestDto.id;

    if (id == null) {
      notification.addError('Mascota id is required', null);
    }

    const name: string = updateMascotaRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Mascota name is required', null);
    }

    const species: string = updateMascotaRequestDto.species.trim();
    if (species.length <= 0) {
      notification.addError('Mascota species is required', null);
    }

    const treatment: string = updateMascotaRequestDto.treatment.trim();

    if (treatment.length <= 0) {
      notification.addError('Mascota treatment is required', null);
    }

    const disease: string = updateMascotaRequestDto.disease.trim();

    if (disease.length <= 0) {
      notification.addError('Mascota disease is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const treatmentResult: Result<AppNotification, Treatment> = Treatment.create(treatment);

    if (treatmentResult.isFailure()) {
      notification.addErrors(treatmentResult.error.getErrors());
    }

    const diseaseResult: Result<AppNotification, Disease> =
      Disease.create(disease);

    if (diseaseResult.isFailure()) {
      notification.addErrors(diseaseResult.error.getErrors());
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const mascota: MascotaTypeORM = await this.mascotaRepository.findOne(targetId);

    let otherMascota: MascotaTypeORM = await this.mascotaRepository.findOne(id);

    if (otherMascota != null && otherMascota.id.value !== mascota.id.value) {
      notification.addError(`There is already an Mascota with id: ${id}`, null);
    }

    otherMascota = await this.mascotaRepository
      .createQueryBuilder()
      .where('treatment = :treatment', { treatment })
      .getOne();

    if (mascota != null && otherMascota.treatment.value !== mascota.treatment.value) {
      notification.addError('Mascota treatment is taken', null);
    }

    return notification;
  }
}
