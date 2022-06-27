import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from "./Gestion_Usuarios/usuario.module";
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AccountsModule } from './Tips/tips.module';
//import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    UsuarioModule,
//    AccountsModule,
//    TransactionsModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}