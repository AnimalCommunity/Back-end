import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterMascotaRequestDto } from "../dtos/request/register-mascota-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterMascotaResponseDto } from "../dtos/response/register-mascota-response.dto";
import { Result } from "typescript-result";
import { RegisterMascotaValidator } from "../validators/register-mascota.validator";
import { RegisterMascotaCommand } from '../commands/register-mascota.command';
import { IdMascotaValidator } from '../validators/id-mascota.validator';
import { UpdateMascotaValidator } from '../validators/update-mascota.validator';
import { GetMascotaByIdResponseDto } from '../dtos/response/get-mascota-by-id-response.dto';
import { GetMascotaByIdQuery } from '../queries/get-mascota-by-id.query';
import { UpdateMascotaRequestDto } from '../dtos/request/update-mascota-request.dto';
import { UpdateMascotaResponseDto } from '../dtos/response/update-mascota-response.dto';
import { UpdateMascotaCommand } from '../commands/update-mascota.command';
import { DeleteMascotaResponseDto } from '../dtos/response/delete-mascota-response.dto';
import { DeleteMascotaCommand } from '../commands/delete-mascota.command';

@Injectable()
export class MascotaApplicationService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private registerMascotaValidator: RegisterMascotaValidator,
    private idValidator: IdMascotaValidator,
    private updateMascotaValidator: UpdateMascotaValidator,
  ) {}

  async getById(
    id: number,
  ): Promise<Result<AppNotification, GetMascotaByIdResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const getMascotaByIdQuery: GetMascotaByIdQuery = new GetMascotaByIdQuery(
      id,
    );

    const mascotaTypeORM = await this.queryBus.execute(getMascotaByIdQuery);

    const getByIdResponseDto: GetMascotaByIdResponseDto =
      new GetMascotaByIdResponseDto(
        mascotaTypeORM.id.value,
        mascotaTypeORM.name,
        mascotaTypeORM.species,
        mascotaTypeORM.treatment.value,
        mascotaTypeORM.disease.value,
        //mascotaTypeORM.age.value,
      );

    return Result.ok(getByIdResponseDto);
  }

  async register(
    registerMascotaRequestDto: RegisterMascotaRequestDto,
  ): Promise<Result<AppNotification, RegisterMascotaResponseDto>> {
    const notification: AppNotification = await this.registerMascotaValidator.validate(registerMascotaRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    //Registro 
    const registerMascotaCommand: RegisterMascotaCommand =
      new RegisterMascotaCommand(
        registerMascotaRequestDto.name,
        registerMascotaRequestDto.species,
        registerMascotaRequestDto.treatment,
        registerMascotaRequestDto.disease,
        //registerMascotaRequestDto.age,
    );
    const mascotaId = await this.commandBus.execute(registerMascotaCommand);
    const registerMascotaResponseDto: RegisterMascotaResponseDto =
      new RegisterMascotaResponseDto(
      mascotaId,
      registerMascotaRequestDto.name,
      registerMascotaRequestDto.species,
      registerMascotaRequestDto.treatment,
      registerMascotaRequestDto.disease,
      //registerMascotaRequestDto.age,
    );
    return Result.ok(registerMascotaResponseDto);
  }

  async update(
    id: number,
    updateMascotaRequestDto: UpdateMascotaRequestDto,
  ): Promise<Result<AppNotification, UpdateMascotaResponseDto>> {
    const notification: AppNotification =
      await this.updateMascotaValidator.validate(id, updateMascotaRequestDto);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const updateMascotaCommand: UpdateMascotaCommand = new UpdateMascotaCommand(
      id,
      updateMascotaRequestDto.id,
      updateMascotaRequestDto.name,
      updateMascotaRequestDto.species,
      updateMascotaRequestDto.treatment,
      updateMascotaRequestDto.disease,
      //updateMascotaRequestDto.age,
    );
    const mascotaTypeORM = await this.commandBus.execute(
      updateMascotaCommand,
    );

    const updateMascotaResponseDto: UpdateMascotaResponseDto =
      new UpdateMascotaResponseDto(
        mascotaTypeORM.id.value,
        mascotaTypeORM.name.value,
        mascotaTypeORM.species.value,
        mascotaTypeORM.treatment.value,
        mascotaTypeORM.disease.value,
        //mascotaTypeORM.age.value,
      );

    return Result.ok(updateMascotaResponseDto);
  }

  async delete(
    id: number,
  ): Promise<Result<AppNotification, DeleteMascotaResponseDto>> {
    const notification: AppNotification = await this.idValidator.validate(id);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const deleteMascotaCommand: DeleteMascotaCommand =
      new DeleteMascotaCommand(id);

    const mascotaTypeORM = await this.commandBus.execute(
      deleteMascotaCommand,
    );

    const deleteMascotaResponseDto: DeleteMascotaResponseDto =
      new DeleteMascotaResponseDto(
        mascotaTypeORM.id.value,
        mascotaTypeORM.name.value,
        mascotaTypeORM.species.value,
        mascotaTypeORM.treatment.value,
        mascotaTypeORM.disease.value,
        //mascotaTypeORM.age.value,
      );

    return Result.ok(deleteMascotaResponseDto);
  }

}