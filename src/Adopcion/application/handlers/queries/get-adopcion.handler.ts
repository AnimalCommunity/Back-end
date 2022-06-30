import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAdopcionQuery } from '../../queries/get-adopcion.query';
import { GetAdopcionDto } from '../../dtos/queries/get-adopcion.dto';

@QueryHandler(GetAdopcionQuery)
export class GetAdopcionHandler implements IQueryHandler<GetAdopcionQuery> {
  constructor() {}

  async execute(query: GetAdopcionQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        name as name,
        last_name as lastName,
        email,
        password
    FROM
        adopcion
    ORDER BY
        id;  
    `;

    const ormAdopcion = await manager.query(sql);

    if (ormAdopcion.length <= 0) {
      return [];
    }

    const adopcion: GetAdopcionDto[] = ormAdopcion.map(function (
      ormAdopcion,
    ) {
      const adopcionDto = new GetAdopcionDto();
      adopcionDto.id = Number(ormAdopcion.id);
      adopcionDto.name = ormAdopcion.name;
      adopcionDto.lastName = ormAdopcion.lastName;
      adopcionDto.email = ormAdopcion.email;
      adopcionDto.password = ormAdopcion.password;
      //adopcionDto.age = ormAdopcion.age;
      return adopcionDto;
    });

    return adopcion;
  }
}