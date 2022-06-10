import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './Tips/tips.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ClientsModule,
    AccountsModule,
    TransactionsModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}