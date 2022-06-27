import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsuarioQuery } from '../../queries/get-usuario.query';
import { GetUsuarioDto } from '../../dtos/queries/get-usuario.dto';

@QueryHandler(GetUsuarioQuery)
export class GetUsuarioHandler implements IQueryHandler<GetUsuarioQuery> {
  constructor() {}

  async execute(query: GetUsuarioQuery) {
    const manager = getManager();

    const sql = `
    SELECT 
        id,
        name as name,
        lastName as lastName,
        email,
        password
    FROM
        usuario
    ORDER BY
        id;  
    `;

    const ormUsuario = await manager.query(sql);

    if (ormUsuario.length <= 0) {
      return [];
    }

    const usuario: GetUsuarioDto[] = ormUsuario.map(function (
      ormUsuario,
    ) {
      const usuarioDto = new GetUsuarioDto();
      usuarioDto.id = Number(ormUsuario.id);
      usuarioDto.name = ormUsuario.name;
      usuarioDto.lastName = ormUsuario.lastName;
      usuarioDto.email = ormUsuario.email;
      usuarioDto.password = ormUsuario.password;
      //usuarioDto.age = ormUsuario.age;
      return usuarioDto;
    });

    return usuario;
  }
}