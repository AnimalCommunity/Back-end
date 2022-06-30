import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from "./Gestion_Usuarios/usuario.module";
import { MascotaModule } from "./Mascotas/mascota.module";
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AccountsModule } from './Tips/tips.module';
//import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    UsuarioModule,
    MascotaModule,
//    AccountsModule,
//    TransactionsModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}