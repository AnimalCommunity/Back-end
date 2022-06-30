import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterAdopcionRequestDto } from "../dtos/request/register-adopcion-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterAdopcionResponseDto } from "../dtos/response/register-adopcion-response.dto";
import { Result } from "typescript-result";
import { RegisterAdopcionValidator } from "../validators/register-adopcion.validator";
import { RegisterAdopcionCommand } from '../commands/register-adopcion.command';
import { IdAdopcionValidator } from '../validators/id-adopcion.validator';
import { UpdateAdopcionValidator } from '../validators/update-adopcion.validator';
import { GetAdopcionByIdResponseDto } from '../dtos/response/get-adopcion-by-id-response.dto';
import { GetAdopcionByIdQuery } from '../queries/get-adopcion-by-id.query';
import { UpdateAdopcionRequestDto } from '../dtos/request/update-adopcion-request.dto';
import { UpdateAdopcionResponseDto } from '../dtos/response/update-adopcion-response.dto';
import { UpdateAdopcionCommand } from '../commands/update-adopcion.command';
import { DeleteAdopcionResponseDto } from '../dtos/response/delete-adopcion-response.dto';
import { DeleteAdopcionCommand } from '../commands/delete-adopcion.command';

@Injectable()
export class AdopcionApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerAdopcionValidator: RegisterAdopcionValidator,
    private idValidator: IdAdopcionValidator,
    private updateAdopcionValidator: UpdateAdopcionValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetAdopcionByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getAdopcionByIdQuery: GetAdopcionByIdQuery = new GetAdopcionByIdQuery(
      id,
    );

    const adopcionTypeORM = await this.queryBus.execute(getAdopcionByIdQuery);

    const getByIdResponseDto: GetAdopcionByIdResponseDto =
      new GetAdopcionByIdResponseDto(
        adopcionTypeORM.id.value,
        adopcionTypeORM.name,
        adopcionTypeORM.lastName,
        adopcionTypeORM.email.value,
        adopcionTypeORM.password.value,
        //adopcionTypeORM.age.value,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerAdopcionRequestDto: RegisterAdopcionRequestDto,
  ): Promise<Result<AppNotification, RegisterAdopcionResponseDto>> {
    const notification: AppNotification = await this.registerAdopcionValidator.validate(registerAdopcionRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    //Registro 
    const registerAdopcionCommand: RegisterAdopcionCommand =
      new RegisterAdopcionCommand(
        registerAdopcionRequestDto.name,
        registerAdopcionRequestDto.lastName,
        registerAdopcionRequestDto.email,
        registerAdopcionRequestDto.password,
        //registerAdopcionRequestDto.age,
    );
    const motherId = await this.commandBus.execute(registerAdopcionCommand);

    const registerAdopcionResponseDto: RegisterAdopcionResponseDto =
      new RegisterAdopcionResponseDto(
      motherId,
      registerAdopcionRequestDto.name,
      registerAdopcionRequestDto.lastName,
      registerAdopcionRequestDto.email,
      registerAdopcionRequestDto.password,
      //registerAdopcionRequestDto.age,
    );
    return Result.ok(registerAdopcionResponseDto);
  }

  async update(
    id: number,
    updateAdopcionRequestDto: UpdateAdopcionRequestDto,
  ): Promise<Result<AppNotification, UpdateAdopcionResponseDto>> {
    const notification: AppNotification =
      await this.updateAdopcionValidator.validate(id, updateAdopcionRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateAdopcionCommand: UpdateAdopcionCommand = new UpdateAdopcionCommand(
      id,
      updateAdopcionRequestDto.id,
      updateAdopcionRequestDto.name,
      updateAdopcionRequestDto.lastName,
      updateAdopcionRequestDto.email,
      updateAdopcionRequestDto.password,
      //updateAdopcionRequestDto.age,
    );
    const adopcionTypeORM = await this.commandBus.execute(
      updateAdopcionCommand,
    );

    const updateAdopcionResponseDto: UpdateAdopcionResponseDto =
      new UpdateAdopcionResponseDto(
        adopcionTypeORM.id.value,
        adopcionTypeORM.name.value,
        adopcionTypeORM.lastName.value,
        adopcionTypeORM.email.value,
        adopcionTypeORM.password.value,
        //adopcionTypeORM.age.value,
      );

    return Result.ok(updateAdopcionResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteAdopcionResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteAdopcionCommand: DeleteAdopcionCommand =
      new DeleteAdopcionCommand(id);

    const adopcionTypeORM = await this.commandBus.execute(
      deleteAdopcionCommand,
    );

    const deleteAdopcionResponseDto: DeleteAdopcionResponseDto =
      new DeleteAdopcionResponseDto(
        adopcionTypeORM.id.value,
        adopcionTypeORM.name.value,
        adopcionTypeORM.lastName.value,
        adopcionTypeORM.email.value,
        adopcionTypeORM.password.value,
        //adopcionTypeORM.age.value,
      );

    return Result.ok(deleteAdopcionResponseDto);
  }

}