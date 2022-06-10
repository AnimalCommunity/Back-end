import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { TipsTypeORM } from '../../infrastructure/persistence/typeorm/entities/tips.typeorm';
import { OpenTipsRequest } from '../dtos/request/open-tips-request.dto';

@Injectable()
export class OpenTipsValidator {
  constructor(@InjectRepository(TipsTypeORM) private accountRepository: Repository<TipsTypeORM>) {}

  public async validate(openTipsRequestDto: OpenTipsRequest): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const number: string = openTipsRequestDto.number.trim();
    if (number.length <= 0) {
      notification.addError('Tips number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const accountTypeORM: TipsTypeORM = await this.accountRepository.createQueryBuilder().where("number = :number", { number }).getOne();
    if (accountTypeORM != null) {
      notification.addError('Tips number is taken', null);
    }
    return notification;
  }
}