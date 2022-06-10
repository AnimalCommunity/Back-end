import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OpenTips } from '../../commands/open-account.command';
import { TipsTypeORM } from '../../../infrastructure/persistence/typeorm/entities/tips.typeorm';
import { TipsNumber } from '../../../domain/value-objects/tips-number.value';
import { AccountFactory } from '../../../domain/factories/account.factory';
import { Tips } from '../../../domain/entities/tips.entity';
import { AccountMapper } from '../../mappers/tips.mapper';
import { ClientId } from '../../../../clients/domain/value-objects/client-id.value';
import { TipsId } from '../../../domain/value-objects/tips-id.value';

@CommandHandler(OpenTips)
export class OpenAccountHandler
  implements ICommandHandler<OpenTips> {
  constructor(
    @InjectRepository(TipsTypeORM)
    private accountRepository: Repository<TipsTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: OpenTips) {
    let accountId: number = 0;
    const accountNumberResult: Result<AppNotification, TipsNumber> = TipsNumber.create(command.number);
    if (accountNumberResult.isFailure()) {
      return accountId;
    }
  }
}