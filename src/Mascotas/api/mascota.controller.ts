import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { MascotaApplicationService } from "../application/services/mascota-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { Result } from 'typescript-result';
import { RegisterMascotaRequestDto } from "../application/dtos/request/register-mascota-request.dto";
import { ApiController } from "../../common/api/api.controller";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterMascotaResponseDto } from "../application/dtos/response/register-mascota-response.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetMascotaDto } from '../application/dtos/queries/get-mascota.dto';
import { GetMascotaQuery } from '../application/queries/get-mascota.query';
import { GetMascotaByIdDto } from '../application/dtos/queries/get-mascota-by-id.dto';
import { UpdateMascotaRequestDto } from '../application/dtos/request/update-mascota-request.dto';
import { UpdateMascotaResponseDto } from '../application/dtos/response/update-mascota-response.dto';
import { DeleteMascotaResponseDto } from '../application/dtos/response/delete-mascota-response.dto';

@ApiBearerAuth()
@ApiTags('mascota')
@Controller ('mascota')
export class MascotaController {
  constructor (
    private readonly mascotasApplicationService: MascotaApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all mascota registered' })
  @ApiResponse({
    status: 200,
    description: 'All mascota returned',
    type: GetMascotaDto,
    isArray: true,
  })
  async getMascotas(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const mascota = await this.queryBus.execute(new GetMascotaQuery());
      return ApiController.ok(response, mascota);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Mascota by Id' })
  @ApiResponse({
    status: 200,
    description: 'Mascota returned',
    type: GetMascotaDto,
  })
  async getMascotaById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetMascotaByIdDto> =
        await this.mascotasApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new user mascota' })
  @ApiResponse({
    status: 200,
    description: 'mascota created',
    type: GetMascotaDto,
  })
  async register(
    @Body() registerMascotaRequestDto: RegisterMascotaRequestDto,
    @Res({ passthrough: true }) response,
  ):Promise<object> {
    try {
      const result: Result<AppNotification, RegisterMascotaResponseDto> =
        await this.mascotasApplicationService.register(
          registerMascotaRequestDto
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
  @ApiOperation({ summary: 'Update mascota information' })
  @ApiResponse({
    status: 200,
    description: 'mascota information updated',
    type: GetMascotaDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateMascotaRequestDto: UpdateMascotaRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateMascotaResponseDto> =
        await this.mascotasApplicationService.update(
          id,
          updateMascotaRequestDto,
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
  @ApiOperation({ summary: 'Delete mascota by Id' })
  @ApiResponse({
    status: 200,
    description: 'mascota deleted',
    type: GetMascotaDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteMascotaResponseDto> =
        await this.mascotasApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
