import { Injectable } from '@nestjs/common';
import { UsuarioTypeORM } from  "../../infrastructure/persistence/typeorm/entities/usuario.typeorm";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class IdUsuarioValidator {
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>,
  ) {}

  public async validate(id: number): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    if (id < 0) {
      notification.addError('The usuario id must be a positive integer', null,);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const mother: UsuarioTypeORM = await this.usuarioRepository.findOne(id);

    if (mother == null) {
      notification.addError(`There is no usuario with id: ${id}`, null);
    }

    return notification;
  }

}
