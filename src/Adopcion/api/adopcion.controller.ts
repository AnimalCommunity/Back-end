import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { AdopcionApplicationService } from "../application/services/adopcion-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { Result } from 'typescript-result';
import { RegisterAdopcionRequestDto } from "../application/dtos/request/register-adopcion-request.dto";
import { ApiController } from "../../common/api/api.controller";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterAdopcionResponseDto } from "../application/dtos/response/register-adopcion-response.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAdopcionDto } from '../application/dtos/queries/get-adopcion.dto';
import { GetAdopcionQuery } from '../application/queries/get-adopcion.query';
import { GetAdopcionByIdDto } from '../application/dtos/queries/get-adopcion-by-id.dto';
import { UpdateAdopcionRequestDto } from '../application/dtos/request/update-adopcion-request.dto';
import { UpdateAdopcionResponseDto } from '../application/dtos/response/update-adopcion-response.dto';
import { DeleteAdopcionResponseDto } from '../application/dtos/response/delete-adopcion-response.dto';

@ApiBearerAuth()
@ApiTags('adopcion')
@Controller ('adopcion')
export class AdopcionController {
  constructor (
    private readonly mothersApplicationService: AdopcionApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all adopcion registered' })
  @ApiResponse({
    status: 200,
    description: 'All adopcion returned',
    type: GetAdopcionDto,
    isArray: true,
  })
  async getMothers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const adopcion = await this.queryBus.execute(new GetAdopcionQuery());
      return ApiController.ok(response, adopcion);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Adopcion by Id' })
  @ApiResponse({
    status: 200,
    description: 'Adopcion returned',
    type: GetAdopcionDto,
  })
  async getMotherById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetAdopcionByIdDto> =
        await this.mothersApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new user adopcion' })
  @ApiResponse({
    status: 200,
    description: 'adopcion created',
    type: GetAdopcionDto,
  })
  async register(
    @Body() registerMotherRequestDto: RegisterAdopcionRequestDto,
    @Res({ passthrough: true }) response,
  ):Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAdopcionResponseDto> =
        await this.mothersApplicationService.register(
          registerMotherRequestDto
        );

      if (result.isSuccess()) {
       return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update adopcion information' })
  @ApiResponse({
    status: 200,
    description: 'adopcion information updated',
    type: GetAdopcionDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateMotherRequestDto: UpdateAdopcionRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateAdopcionResponseDto> =
        await this.mothersApplicationService.update(
          id,
          updateMotherRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete adopcion by Id' })
  @ApiResponse({
    status: 200,
    description: 'adopcion deleted',
    type: GetAdopcionDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteAdopcionResponseDto> =
        await this.mothersApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
