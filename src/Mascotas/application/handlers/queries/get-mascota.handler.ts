import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMascotaQuery } from '../../queries/get-mascota.query';
import { GetMascotaDto } from '../../dtos/queries/get-mascota.dto';

@QueryHandler(GetMascotaQuery)
export class GetMascotaHandler implements IQueryHandler<GetMascotaQuery> {
  constructor() {}

  async execute(query: GetMascotaQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        name,
        species,
        treatment,
        disease
    FROM
        mascotas
    ORDER BY
        id;  
    `;

    const ormMascota = await manager.query(sql);

    if (ormMascota.length <= 0) {
      return [];
    }

    const mascota: GetMascotaDto[] = ormMascota.map(function (
      ormMascota,
    ) {
      const mascotaDto = new GetMascotaDto();
      mascotaDto.id = Number(ormMascota.id);
      mascotaDto.name = ormMascota.name;
      mascotaDto.species = ormMascota.species;
      mascotaDto.treatment = ormMascota.treatment;
      mascotaDto.disease = ormMascota.disease;
      //mascotaDto.age = ormMascota.age;
      return mascotaDto;
    });

    return mascota;
  }
}