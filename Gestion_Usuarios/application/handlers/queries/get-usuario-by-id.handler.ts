import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUsuarioByIdQuery } from '../../queries/get-usuario-by-id.query';
import { UsuarioTypeORM } from '../../../infrastructure/persistence/typeorm/entities/usuario.typeorm';

@QueryHandler(GetUsuarioByIdQuery)
export class GetUsuarioByIdHandler
  implements IQueryHandler<GetUsuarioByIdQuery>
{
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>,
  ) {}

  async execute(query: GetUsuarioByIdQuery) {
    const id = query.id;

    const usuario: UsuarioTypeORM = await this.usuarioRepository.findOne(
      id,
    );

    return usuario;
  }
}