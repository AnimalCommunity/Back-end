import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsuarioTypeORM } from '../../../infrastructure/persistence/typeorm/entities/usuario.typeorm';
import { DeleteUsuarioCommand } from '../../commands/delete-usuario.command';

@CommandHandler(DeleteUsuarioCommand)
export class DeleteUsuarioHandler
  implements ICommandHandler<DeleteUsuarioCommand>
{
  constructor(
    @InjectRepository(UsuarioTypeORM)
    private usuarioRepository: Repository<UsuarioTypeORM>,
  ) {}

  async execute(command: DeleteUsuarioCommand) {
    const id = command.id;

    const mother = await this.usuarioRepository.findOne(id);
    await this.usuarioRepository.delete(id);

    return mother;
  }
}