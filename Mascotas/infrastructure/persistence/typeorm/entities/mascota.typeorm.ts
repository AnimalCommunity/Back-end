import { Column, Entity, Unique } from "typeorm";
import { MascotaIdTypeORM } from "../value-objects/mascota-id.typeorm";
import { TreatmentTypeORM } from "src/common/infrastructure/persistence/typeorm/entities/treatment.typeorm";
import { DiseaseTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/Disease.typeorm';

@Entity('mascotas')
@Unique('UQ_mascota_treatment', ['treatment.value'])
export class MascotaTypeORM {
  @Column((type) => MascotaIdTypeORM, { prefix: false })
  public id: MascotaIdTypeORM;

  @Column('varchar', { name: 'name', length: 75, nullable: false })
  public name: string;

  @Column('varchar', { name: 'species', length: 75, nullable: false })
  public species: string;

  @Column((type) => TreatmentTypeORM, { prefix: false })
  public treatment: TreatmentTypeORM;

  @Column((type) => DiseaseTypeORM, { prefix: false })
  public disease: DiseaseTypeORM;

}