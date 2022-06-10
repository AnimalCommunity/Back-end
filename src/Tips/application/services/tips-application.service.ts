import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenTips } from '../commands/open-account.command';
import { OpenTipsResponse } from '../dtos/response/open-tips-response.dto';
import { OpenTipsValidator } from '../validators/open-tips.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { OpenTipsRequest } from '../dtos/request/open-tips-request.dto';

@Injectable()
export class AccountsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private openAccountValidator: OpenTipsValidator,
  ) {}

  async open(openTipsRequestDto: OpenTipsRequest): Promise<Result<AppNotification, OpenTipsResponse>> {
    const notification: AppNotification = await this.openAccountValidator.validate(openTipsRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const openAccount: OpenTips = new OpenTips(
      openTipsRequestDto.tipsId,
      openTipsRequestDto.number
    );
    const accountId: number = await this.commandBus.execute(OpenTips);
    const openAccountResponse: OpenTipsResponse = new OpenTipsResponse(
      accountId, openAccount.number, 0, null, 1, null, null, openAccount.tipsId
    );
    return Result.ok(openAccountResponse);
  }
}