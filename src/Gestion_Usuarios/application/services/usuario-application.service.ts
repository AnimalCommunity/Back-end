import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUsuarioRequestDto } from "../dtos/request/register-usuario-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterUsuarioResponseDto } from "../dtos/response/register-usuario-response.dto";
import { Result } from "typescript-result";
import { RegisterUsuarioValidator } from "../validators/register-usuario.validator";
import { RegisterUsuarioCommand } from '../commands/register-usuario.command';
import { IdUsuarioValidator } from '../validators/id-usuario.validator';
import { UpdateUsuarioValidator } from '../validators/update-usuario.validator';
import { GetUsuarioByIdResponseDto } from '../dtos/response/get-usuario-by-id-response.dto';
import { GetUsuarioByIdQuery } from '../queries/get-usuario-by-id.query';
import { UpdateUsuarioRequestDto } from '../dtos/request/update-usuario-request.dto';
import { UpdateUsuarioResponseDto } from '../dtos/response/update-usuario-response.dto';
import { UpdateUsuarioCommand } from '../commands/update-usuario.command';
import { DeleteUsuarioResponseDto } from '../dtos/response/delete-usuario-response.dto';
import { DeleteUsuarioCommand } from '../commands/delete-usuario.command';

@Injectable()
export class UsuarioApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerUsuarioValidator: RegisterUsuarioValidator,
    private idValidator: IdUsuarioValidator,
    private updateUsuarioValidator: UpdateUsuarioValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetUsuarioByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getUsuarioByIdQuery: GetUsuarioByIdQuery = new GetUsuarioByIdQuery(
      id,
    );

    const usuarioTypeORM = await this.queryBus.execute(getUsuarioByIdQuery);

    const getByIdResponseDto: GetUsuarioByIdResponseDto =
      new GetUsuarioByIdResponseDto(
        usuarioTypeORM.id.value,
        usuarioTypeORM.name,
        usuarioTypeORM.lastName,
        usuarioTypeORM.email.value,
        usuarioTypeORM.password.value,
        //usuarioTypeORM.age.value,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerUsuarioRequestDto: RegisterUsuarioRequestDto,
  ): Promise<Result<AppNotification, RegisterUsuarioResponseDto>> {
    const notification: AppNotification = await this.registerUsuarioValidator.validate(registerUsuarioRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    //Registro 
    const registerUsuarioCommand: RegisterUsuarioCommand =
      new RegisterUsuarioCommand(
        registerUsuarioRequestDto.name,
        registerUsuarioRequestDto.lastName,
        registerUsuarioRequestDto.email,
        registerUsuarioRequestDto.password,
        //registerUsuarioRequestDto.age,
    );
    const motherId = await this.commandBus.execute(registerUsuarioCommand);

    const registerUsuarioResponseDto: RegisterUsuarioResponseDto =
      new RegisterUsuarioResponseDto(
      motherId,
      registerUsuarioRequestDto.name,
      registerUsuarioRequestDto.lastName,
      registerUsuarioRequestDto.email,
      registerUsuarioRequestDto.password,
      //registerUsuarioRequestDto.age,
    );
    return Result.ok(registerUsuarioResponseDto);
  }

  async update(
    id: number,
    updateUsuarioRequestDto: UpdateUsuarioRequestDto,
  ): Promise<Result<AppNotification, UpdateUsuarioResponseDto>> {
    const notification: AppNotification =
      await this.updateUsuarioValidator.validate(id, updateUsuarioRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateUsuarioCommand: UpdateUsuarioCommand = new UpdateUsuarioCommand(
      id,
      updateUsuarioRequestDto.id,
      updateUsuarioRequestDto.name,
      updateUsuarioRequestDto.lastName,
      updateUsuarioRequestDto.email,
      updateUsuarioRequestDto.password,
      //updateUsuarioRequestDto.age,
    );
    const usuarioTypeORM = await this.commandBus.execute(
      updateUsuarioCommand,
    );

    const updateUsuarioResponseDto: UpdateUsuarioResponseDto =
      new UpdateUsuarioResponseDto(
        usuarioTypeORM.id.value,
        usuarioTypeORM.name.value,
        usuarioTypeORM.lastName.value,
        usuarioTypeORM.email.value,
        usuarioTypeORM.password.value,
        //usuarioTypeORM.age.value,
      );

    return Result.ok(updateUsuarioResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteUsuarioResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteUsuarioCommand: DeleteUsuarioCommand =
      new DeleteUsuarioCommand(id);

    const usuarioTypeORM = await this.commandBus.execute(
      deleteUsuarioCommand,
    );

    const deleteUsuarioResponseDto: DeleteUsuarioResponseDto =
      new DeleteUsuarioResponseDto(
        usuarioTypeORM.id.value,
        usuarioTypeORM.name.value,
        usuarioTypeORM.lastName.value,
        usuarioTypeORM.email.value,
        usuarioTypeORM.password.value,
        //usuarioTypeORM.age.value,
      );

    return Result.ok(deleteUsuarioResponseDto);
  }

}