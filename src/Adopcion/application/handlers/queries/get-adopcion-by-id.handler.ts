import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAdopcionByIdQuery } from '../../queries/get-adopcion-by-id.query';
import { AdopcionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/adopcion.typeorm';

@QueryHandler(GetAdopcionByIdQuery)
export class GetAdopcionByIdHandler
  implements IQueryHandler<GetAdopcionByIdQuery>
{
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>,
  ) {}

  async execute(query: GetAdopcionByIdQuery) {
    const id = query.id;

    const mother: AdopcionTypeORM = await this.adopcionRepository.findOne(
      id,
    );

    return mother;
  }
}