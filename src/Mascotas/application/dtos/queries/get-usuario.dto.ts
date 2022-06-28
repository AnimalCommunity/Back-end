import { ApiProperty } from '@nestjs/swagger';

export class GetUsuarioDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public lastName: string;
  @ApiProperty()
  public password: string;
  @ApiProperty()
  public email: string;
  //@ApiProperty()
  //public age: number;
}
