import { ClientId } from '../../../clients/domain/value-objects/client-id.value';
import { Tips } from '../entities/tips.entity';
import { TipsNumber } from '../value-objects/tips-number.value';
import { TipsId } from '../value-objects/tips-id.value';

export class AccountFactory {
  public static createFrom(number: TipsNumber, clientId: ClientId): Tips {
    return new Tips(number,clientId);
  }

  public static withId(tipsId: TipsId, number: TipsNumber,clientId: ClientId): Tips {
    let account: Tips = new Tips(number, clientId);
    account.changeId(tipsId);
    return account;
  }
}