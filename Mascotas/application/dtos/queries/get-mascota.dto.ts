import { ApiProperty } from '@nestjs/swagger';

export class GetMascotaDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public species: string;
  @ApiProperty()
  public disease: string;
  @ApiProperty()
  public treatment: string;
  //@ApiProperty()
  //public age: number;
}
