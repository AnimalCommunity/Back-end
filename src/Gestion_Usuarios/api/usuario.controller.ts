import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsuarioApplicationService } from "../application/services/usuario-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { Result } from 'typescript-result';
import { RegisterUsuarioRequestDto } from "../application/dtos/request/register-usuario-request.dto";
import { ApiController } from "../../common/api/api.controller";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterUsuarioResponseDto } from "../application/dtos/response/register-usuario-response.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsuarioDto } from '../application/dtos/queries/get-usuario.dto';
import { GetUsuarioQuery } from '../application/queries/get-usuario.query';
import { GetUsuarioByIdDto } from '../application/dtos/queries/get-usuario-by-id.dto';
import { UpdateUsuarioRequestDto } from '../application/dtos/request/update-usuario-request.dto';
import { UpdateUsuarioResponseDto } from '../application/dtos/response/update-usuario-response.dto';
import { DeleteUsuarioResponseDto } from '../application/dtos/response/delete-usuario-response.dto';

@ApiBearerAuth()
@ApiTags('usuario')
@Controller ('usuario')
export class UsuarioController {
  constructor (
    private readonly usuariosApplicationService: UsuarioApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all usuario registered' })
  @ApiResponse({
    status: 200,
    description: 'All usuario returned',
    type: GetUsuarioDto,
    isArray: true,
  })
  async getUsuarios(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const usuario = await this.queryBus.execute(new GetUsuarioQuery());
      return ApiController.ok(response, usuario);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get Usuario by Id' })
  @ApiResponse({
    status: 200,
    description: 'Usuario returned',
    type: GetUsuarioDto,
  })
  async getUsuarioById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetUsuarioByIdDto> =
        await this.usuariosApplicationService.getById(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new user usuario' })
  @ApiResponse({
    status: 200,
    description: 'usuario created',
    type: GetUsuarioDto,
  })
  async register(
    @Body() registerUsuarioRequestDto: RegisterUsuarioRequestDto,
    @Res({ passthrough: true }) response,
  ):Promise<object> {
    try {
      const result: Result<AppNotification, RegisterUsuarioResponseDto> =
        await this.usuariosApplicationService.register(
          registerUsuarioRequestDto
        );

      if (result.isSuccess()) {
       return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update usuario information' })
  @ApiResponse({
    status: 200,
    description: 'usuario information updated',
    type: GetUsuarioDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateUsuarioRequestDto: UpdateUsuarioRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, UpdateUsuarioResponseDto> =
        await this.usuariosApplicationService.update(
          id,
          updateUsuarioRequestDto,
        );

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete usuario by Id' })
  @ApiResponse({
    status: 200,
    description: 'usuario deleted',
    type: GetUsuarioDto,
  })
  async delete(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DeleteUsuarioResponseDto> =
        await this.usuariosApplicationService.delete(id);

      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }

      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
