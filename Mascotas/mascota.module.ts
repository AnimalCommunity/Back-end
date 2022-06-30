import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MascotaController } from './api/mascota.controller';
import { MascotaApplicationService } from './application/services/mascota-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaTypeORM } from "./infrastructure/persistence/typeorm/entities/mascota.typeorm";
import { RegisterMascotaValidator } from './application/validators/register-mascota.validator';
import { RegisterMascotaHandler } from './application/handlers/commands/register-mascota.handler';
import { MascotaRegisteredHandler } from './application/handlers/events/mascota-registered.handler';
import { DeleteMascotaHandler } from './application/handlers/commands/delete-mascota.handler';
import { UpdateMascotaHandler } from './application/handlers/commands/update-mascota.handler';
import { GetMascotaByIdHandler } from './application/handlers/queries/get-mascota-by-id.handler';
import { GetMascotaHandler } from './application/handlers/queries/get-mascota.handler';
import { IdMascotaValidator } from './application/validators/id-mascota.validator';
import { UpdateMascotaValidator } from './application/validators/update-mascota.validator';

export const CommandHandlers = [
  RegisterMascotaHandler,
  DeleteMascotaHandler,
  UpdateMascotaHandler,
];
export const EventHandlers = [MascotaRegisteredHandler];
export const QueryHandlers = [GetMascotaHandler, GetMascotaByIdHandler];
export const Validators = [
  RegisterMascotaValidator,
  IdMascotaValidator,
  UpdateMascotaValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([MascotaTypeORM])],
  controllers: [MascotaController],
  providers: [
    MascotaApplicationService,
    RegisterMascotaValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class MascotaModule {}
