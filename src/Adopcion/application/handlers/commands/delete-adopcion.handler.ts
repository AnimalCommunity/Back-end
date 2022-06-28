import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AdopcionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/adopcion.typeorm';
import { DeleteAdopcionCommand } from '../../commands/delete-adopcion.command';

@CommandHandler(DeleteAdopcionCommand)
export class DeleteAdopcionHandler
  implements ICommandHandler<DeleteAdopcionCommand>
{
  constructor(
    @InjectRepository(AdopcionTypeORM)
    private adopcionRepository: Repository<AdopcionTypeORM>,
  ) {}

  async execute(command: DeleteAdopcionCommand) {
    const id = command.id;

    const mother = await this.adopcionRepository.findOne(id);
    await this.adopcionRepository.delete(id);

    return mother;
  }
}