import { MascotaTypeORM } from "../../infrastructure/persistence/typeorm/entities/mascota.typeorm";
import { Mascota } from '../../domain/entities/mascota.entity';
import { MascotaIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/mascota-id.typeorm';
import { TreatmentTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/treatment.typeorm';
import { AgeTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/age.typeorm';
import { DiseaseTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/disease.typeorm';

export class MascotaMapper {
  public static toTypeORM(mascota: Mascota): MascotaTypeORM {
    const mascotaTypeORM: MascotaTypeORM = new MascotaTypeORM();

    mascotaTypeORM.id = MascotaIdTypeORM.from(mascota.getId().getValue());
    mascotaTypeORM.name = mascota.getName();
    mascotaTypeORM.species = mascota.getSpecies();
    mascotaTypeORM.treatment = TreatmentTypeORM.from(mascota.getTreatment().getValue());
    (mascotaTypeORM.disease = DiseaseTypeORM.from(
      mascota.getDisease().getValue(),
    ));
      /*(mascotaTypeORM.age = AgeTypeORM.from(mascota.getAge().getAge()))*/;
    return mascotaTypeORM;
  }
}
