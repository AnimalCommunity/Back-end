import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioTypeORM } from "../../infrastructure/persistence/typeorm/entities/usuario.typeorm";
import { Email } from '../../domain/value-objects/email-value';
import { AppNotification } from '../../../common/application/app.notification';
import { Password } from '../../../common/domain/value-objects/password.value';
import { Result } from 'typescript-result';
import { UpdateUsuarioRequestDto } from '../dtos/request/update-usuario-request.dto';

@Injectable()
export class UpdateUsuarioValidator {
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>,
  ) {}

  public async validate(
    targetId: number,
    updateUsuarioRequestDto: UpdateUsuarioRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();

    const id: number = updateUsuarioRequestDto.id;

    if (id == null) {
      notification.addError('Usuario id is required', null);
    }

    const name: string = updateUsuarioRequestDto.name.trim();
    if (name.length <= 0) {
      notification.addError('Usuario name is required', null);
    }

    const lastname: string = updateUsuarioRequestDto.lastName.trim();
    if (lastname.length <= 0) {
      notification.addError('Usuario lastname is required', null);
    }

    const email: string = updateUsuarioRequestDto.email.trim();

    if (email.length <= 0) {
      notification.addError('Usuario email is required', null);
    }

    const password: string = updateUsuarioRequestDto.password.trim();

    if (password.length <= 0) {
      notification.addError('Usuario password is required', null);
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

    const usuario: UsuarioTypeORM = await this.usuarioRepository.findOne(targetId);

    let otherUsuario: UsuarioTypeORM = await this.usuarioRepository.findOne(id);

    if (otherUsuario != null && otherUsuario.id.value !== usuario.id.value) {
      notification.addError(`There is already an Usuario with id: ${id}`, null);
    }

    otherUsuario = await this.usuarioRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (usuario != null && otherUsuario.email.value !== usuario.email.value) {
      notification.addError('Usuario email is taken', null);
    }

    return notification;
  }
}
