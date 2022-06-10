import { TipsTypeORM } from '../../infrastructure/persistence/typeorm/entities/tips.typeorm';
import { Tips } from '../../domain/entities/tips.entity';
import { TipsNumberTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/tips-number.typeorm';
import { CustomerIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/customer-id.typeorm';
import { BalanceTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/balance.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class AccountMapper {
  public static toTypeORM(tips: Tips): TipsTypeORM {
    const tipsTypeORM: TipsTypeORM = new TipsTypeORM();
    tipsTypeORM.id = tips.getId() != null ? tips.getId().getValue() : 0;
    return tipsTypeORM;
  }
}