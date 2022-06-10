import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TipsOpened } from '../../../domain/events/tips-opened.event';

@EventsHandler(TipsOpened)
export class AccountOpenedHandler implements IEventHandler<TipsOpened> {
  constructor() {}

  handle(event: TipsOpened) {
    console.log('handle logic for TipsOpened');
    console.log(event);
  }
}