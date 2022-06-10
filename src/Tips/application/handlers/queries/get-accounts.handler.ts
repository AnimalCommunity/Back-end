import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetTipsQuery } from '../../queries/get-tips.query';
import { GetTipsDto } from '../../dtos/queries/get-tips.dto';

@QueryHandler(GetTipsQuery)
export class GetAccountsHandler implements IQueryHandler<GetTipsQuery> {
  constructor() {}

  async execute(query: GetTipsQuery) {
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
    ORDER BY
      a.created_at DESC;`;
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return [];
    }
    const accounts: GetTipsDto[] = ormAccounts.map(function (ormAccount) {
      let accountDto = new GetTipsDto();
      accountDto.id = Number(ormAccount.id);
      accountDto.balance = Number(ormAccount.balance);
      accountDto.createdAt = ormAccount.created_at;
      accountDto.createdBy = ormAccount.created_by;
      accountDto.updatedAt = ormAccount.updated_at;
      accountDto.updatedBy = ormAccount.updated_by;
      return accountDto;
    });
    return accounts;
  }
}