import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdopcionTypeORM } from "../../infrastructure/persistence/typeorm/entities/adopcion.typeorm";
import { Email } from '../../domain/value-objects/email-value';
import { AppNotification } from '../../../common/application/app.notification';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Result } from 'typescript-result';
import { UpdateAdopcionRequestDto } from '../dtos/request/update-adopcion-request.dto';

@Injectable()
export class UpdateAdopcionValidator {
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateAdopcionRequestDto: UpdateAdopcionRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateAdopcionRequestDto.id;

    if (id == null) {
      notification.addError('Adopcion id is required', null);
    }

    const name: string = updateAdopcionRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Adopcion name is required', null);
    }

    const lastname: string = updateAdopcionRequestDto.lastName.trim();
    if (lastname.length <= 0) {
      notification.addError('Adopcion lastname is required', null);
    }

    const email: string = updateAdopcionRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Adopcion email is required', null);
    }

    const password: string = updateAdopcionRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Adopcion password is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(email);

    if (emailResult.isFailure()) {
      notification.addErrors(emailResult.error.getErrors());
    }

    const passwordResult: Result<AppNotification, Password> =
      Password.create(password);

    if (passwordResult.isFailure()) {
      notification.addErrors(passwordResult.error.getErrors());
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const adopcion: AdopcionTypeORM = await this.adopcionRepository.findOne(targetId);

    let otherAdopcion: AdopcionTypeORM = await this.adopcionRepository.findOne(id);

    if (otherAdopcion != null && otherAdopcion.id.value !== adopcion.id.value) {
      notification.addError(`There is already an Adopcion with id: ${id}`, null);
    }

    otherAdopcion = await this.adopcionRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (adopcion != null && otherAdopcion.email.value !== adopcion.email.value) {
      notification.addError('Adopcion email is taken', null);
    }

    return notification;
  }
}
