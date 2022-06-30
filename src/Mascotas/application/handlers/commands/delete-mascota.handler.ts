import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MascotaTypeORM } from '../../../infrastructure/persistence/typeorm/entities/mascota.typeorm';
import { DeleteMascotaCommand } from '../../commands/delete-mascota.command';

@CommandHandler(DeleteMascotaCommand)
export class DeleteMascotaHandler
  implements ICommandHandler<DeleteMascotaCommand>
{
  constructor(
    @InjectRepository(MascotaTypeORM)
    private mascotaRepository: Repository<MascotaTypeORM>,
  ) {}

  async execute(command: DeleteMascotaCommand) {
    const id = command.id;

    const mascota = await this.mascotaRepository.findOne(id);
    await this.mascotaRepository.delete(id);

    return mascota;
  }
}