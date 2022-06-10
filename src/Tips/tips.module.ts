import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TipsTypeORM } from './infrastructure/persistence/typeorm/entities/tips.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipsController } from './api/tips.controller';
import { AccountOpenedHandler } from './application/handlers/events/tips-opened.handler';
import { AccountsApplicationService } from './application/services/tips-application.service';
import { OpenTipsValidator } from './application/validators/open-tips.validator';
import { GetAccountsHandler } from './application/handlers/queries/get-accounts.handler';
import { GetAccountByIdHandler } from './application/handlers/queries/get-account-by-id.handler';
import { OpenAccountHandler } from './application/handlers/commands/tips-account.handler';


export const CommandHandlers = [OpenAccountHandler];
export const QueryHandlers = [GetAccountsHandler, GetAccountByIdHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TipsTypeORM]),
  ],
  controllers: [TipsController],
  providers: [
    AccountsApplicationService,
    OpenTipsValidator,
    ...CommandHandlers,
    ...QueryHandlers
  ]
})
export class AccountsModule {}