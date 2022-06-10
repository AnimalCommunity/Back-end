import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { OpenTipsRequest } from '../application/dtos/request/open-tips-request.dto';
import { OpenTipsResponse } from '../application/dtos/response/open-tips-response.dto';
import { TipsApplicationService } from '../application/services/tips-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetTipsByIdQuery } from '../application/queries/get-tips-by-id.query';
import { GetTipsQuery } from '../application/queries/get-tips.query';

@Controller('tips')
export class TipsController {
  constructor(
    private readonly accountsApplicationService: TipsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async open(
    @Body() openAccountRequest: OpenTipsRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenTipsResponse> = await this.accountsApplicationService.open(openAccountRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getAccounts(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetTipsQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') accountId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetTipsByIdQuery(accountId));
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}