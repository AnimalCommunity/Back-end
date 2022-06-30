import { Treatment } from '../value-objects/treatment-value';
//import { Age } from '../value-objects/age.value';
import { Mascota } from '../entities/mascota.entity';
import { MascotaId } from '../value-objects/mascota-id.value';
import { Disease } from '../../../common/domain/value-objects/disease.value';

export class MascotaFactory {
  public static createFrom(
    name: string,
    species: string,
    treatment: Treatment,
    disease: Disease,
    //age: Age
  ): Mascota {
    return new Mascota(
      MascotaId.create(0),
      name,
      species,
      treatment,
      disease,
      /*age*/);
  }

  public static withId(mascotaId: MascotaId, name: string, species: string, treatment: Treatment, disease: Disease/*, age: Age*/): Mascota {
    return new Mascota(mascotaId, name, species, treatment, disease/*, age*/);
  }
}