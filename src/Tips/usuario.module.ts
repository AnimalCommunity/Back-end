import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsuarioController } from './api/usuario.controller';
import { UsuarioApplicationService } from './application/services/usuario-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioTypeORM } from "./infrastructure/persistence/typeorm/entities/usuario.typeorm";
import { RegisterUsuarioValidator } from './application/validators/register-usuario.validator';
import { RegisterUsuarioHandler } from './application/handlers/commands/register-usuario.handler';
import { UsuarioRegisteredHandler } from './application/handlers/events/usuario-registered.handler';
import { DeleteUsuarioHandler } from './application/handlers/commands/delete-usuario.handler';
import { UpdateUsuarioHandler } from './application/handlers/commands/update-usuario.handler';
import { GetUsuarioByIdHandler } from './application/handlers/queries/get-usuario-by-id.handler';
import { GetUsuarioHandler } from './application/handlers/queries/get-usuario.handler';
import { IdUsuarioValidator } from './application/validators/id-usuario.validator';
import { UpdateUsuarioValidator } from './application/validators/update-usuario.validator';

export const CommandHandlers = [
  RegisterUsuarioHandler,
  DeleteUsuarioHandler,
  UpdateUsuarioHandler,
];
export const EventHandlers = [UsuarioRegisteredHandler];
export const QueryHandlers = [GetUsuarioHandler, GetUsuarioByIdHandler];
export const Validators = [
  RegisterUsuarioValidator,
  IdUsuarioValidator,
  UpdateUsuarioValidator,
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UsuarioTypeORM])],
  controllers: [UsuarioController],
  providers: [
    UsuarioApplicationService,
    RegisterUsuarioValidator,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class UsuarioModule {}
