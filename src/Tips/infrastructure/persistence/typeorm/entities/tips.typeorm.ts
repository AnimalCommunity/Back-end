import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TipsNumberTypeORM } from '../value-objects/tips-number.typeorm';
import { TipsIdTypeORM } from '../value-objects/tips-id.typeorm';
import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { CustomerIdTypeORM } from '../value-objects/customer-id.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

@Entity('tips')
@Unique('UQ_accounts_number', ['number.value'])
export class TipsTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => TipsNumberTypeORM, { prefix: false })
  public number: TipsNumberTypeORM;

  @Column((type) => BalanceTypeORM, { prefix: false })
  public balance: BalanceTypeORM;

  @Column((type) => CustomerIdTypeORM, { prefix: false })
  public clientId: CustomerIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}