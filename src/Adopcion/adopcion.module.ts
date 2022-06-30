import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AdopcionController } from './api/adopcion.controller';
import { AdopcionApplicationService } from './application/services/adopcion-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopcionTypeORM } from "./infrastructure/persistence/typeorm/entities/adopcion.typeorm";
import { RegisterAdopcionValidator } from './application/validators/register-adopcion.validator';
import { RegisterAdopcionHandler } from './application/handlers/commands/register-adopcion.handler';
import { AdopcionRegisteredHandler } from './application/handlers/events/adopcion-registered.handler';
import { DeleteAdopcionHandler } from './application/handlers/commands/delete-adopcion.handler';
import { UpdateAdopcionHandler } from './application/handlers/commands/update-adopcion.handler';
import { GetAdopcionByIdHandler } from './application/handlers/queries/get-adopcion-by-id.handler';
import { GetAdopcionHandler } from './application/handlers/queries/get-adopcion.handler';
import { IdAdopcionValidator } from './application/validators/id-adopcion.validator';
import { UpdateAdopcionValidator } from './application/validators/update-adopcion.validator';

export const CommandHandlers = [
  RegisterAdopcionHandler,
  DeleteAdopcionHandler,
  UpdateAdopcionHandler,
];
export const EventHandlers = [AdopcionRegisteredHandler];
export const QueryHandlers = [GetAdopcionHandler, GetAdopcionByIdHandler];
export const Validators = [
  RegisterAdopcionValidator,
  IdAdopcionValidator,
  UpdateAdopcionValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([AdopcionTypeORM])],
  controllers: [AdopcionController],
  providers: [
    AdopcionApplicationService,
    RegisterAdopcionValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class AdopcionModule {}
