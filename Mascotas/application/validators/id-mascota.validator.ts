import { Injectable } from '@nestjs/common';
import { MascotaTypeORM } from  "../../infrastructure/persistence/typeorm/entities/mascota.typeorm";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class IdMascotaValidator {
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('The mascota id must be a positive integer', null,);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const mascota: MascotaTypeORM = await this.mascotaRepository.findOne(id);

    if (mascota == null) {
      notification.addError(`There is no mascota with id: ${id}`, null);
    }

    return notification;
  }

}
