import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetTipsDto } from '../../dtos/queries/get-tips.dto';
import { GetTipsByIdQuery } from '../../queries/get-tips-by-id.query';

@QueryHandler(GetTipsByIdQuery)
export class GetAccountByIdHandler implements IQueryHandler<GetTipsByIdQuery> {
  constructor() {}

  async execute(query: GetTipsByIdQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.balance,
      a.client_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      accounts a
    WHERE
      a.id = ?;`;
    const ormAccounts = await manager.query(sql, [query.accountId]);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormAccount = ormAccounts[0];
    let accountDto = new GetTipsDto();
    accountDto.id = Number(ormAccount.id);
    accountDto.balance = Number(ormAccount.balance);
    accountDto.createdAt = ormAccount.created_at;
    accountDto.createdBy = ormAccount.created_by;
    accountDto.updatedAt = ormAccount.updated_at;
    accountDto.updatedBy = ormAccount.updated_by;
    return accountDto;
  }
}