import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetMascotaByIdQuery } from '../../queries/get-mascota-by-id.query';
import { MascotaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mascota.typeorm';

@QueryHandler(GetMascotaByIdQuery)
export class GetMascotaByIdHandler
  implements IQueryHandler<GetMascotaByIdQuery>
{
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>,
  ) {}

  async execute(query: GetMascotaByIdQuery) {
    const id = query.id;

    const mascota: MascotaTypeORM = await this.mascotaRepository.findOne(
      id,
    );

    return mascota;
  }
}