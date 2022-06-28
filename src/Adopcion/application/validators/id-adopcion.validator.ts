import { Injectable } from '@nestjs/common';
import { AdopcionTypeORM } from  "../../infrastructure/persistence/typeorm/entities/adopcion.typeorm";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class IdAdopcionValidator {
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('The adopcion id must be a positive integer', null,);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const mother: AdopcionTypeORM = await this.adopcionRepository.findOne(id);

    if (mother == null) {
      notification.addError(`There is no adopcion with id: ${id}`, null);
    }

    return notification;
  }

}
