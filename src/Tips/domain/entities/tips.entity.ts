import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { AggregateRoot } from '@nestjs/cqrs';
import { TipsId } from '../value-objects/tips-id.value';
import { TipsNumber } from '../value-objects/tips-number.value';
import { TipsOpened } from '../events/tips-opened.event';

export class Tips extends AggregateRoot {
  private id: TipsId;
  private readonly number: TipsNumber;
  private readonly clientId: ClientId;

  public constructor(number: TipsNumber,  clientId: ClientId) {
    super();
    this.number = number;
    this.clientId = clientId;
  }

  public open() {
    const event = new TipsOpened(this.id.getValue(), this.number.getValue());
    this.apply(event);
  }

  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public hasIdentity(): boolean {
    return this.number.getValue().trim().length > 0;
  }

  public getId(): TipsId {
    return this.id;
  }


  public getClientId(): ClientId {
    return this.clientId;
  }


  public changeId(id: TipsId) {
    this.id = id;
  }
}