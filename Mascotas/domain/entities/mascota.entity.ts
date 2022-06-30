import { AggregateRoot } from '@nestjs/cqrs';
import { MascotaId } from '../value-objects/mascota-id.value';
import { Treatment } from '../value-objects/treatment-value';
//import { Age } from '../value-objects/age.value';
import { MascotaRegistrado } from '../events/mascota-registrado.event';
import { Disease } from '../../../common/domain/value-objects/disease.value';

export class Mascota extends AggregateRoot {
  private id: MascotaId;
  private name: string;
  private species: string;
  private treatment: Treatment;
  private disease: Disease;
  //private age: Age;

  public constructor(
    id: MascotaId,
    name: string,
    species: string,
    treatment: Treatment,
    disease: Disease,
    //age: Age,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.species = species;
    this.treatment = treatment;
    this.disease = disease;
    //this.age = age;
  }

  public register() {
    const event = new MascotaRegistrado(
      this.id.getValue(),
      this.name,
      this.species,
      this.treatment.getValue(),
      this.disease.getValue(),
      //this.age.getAge(),
    );
    this.apply(event);
  }

  public getId(): MascotaId {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getSpecies(): string {
    return this.species;
  }

  public getTreatment(): Treatment {
    return this.treatment;
  }
  public getDisease(): Disease {
    return this.disease;
  }

  /*public getAge(): Age {
    return this.age;
  }*/

  public changeId(id: MascotaId): void {
    this.id = id;
  }

  public changeName(name: string): void {
    this.name = name;
  }

  public changeSpecies(species: string): void {
    this.species = species;
  }

  public changeTreatment(treatment: Treatment): void {
    this.treatment = treatment;
  }

  /*public changeAge(age: Age): void {
    this.age = age;
  }*/

  public changeDisease(disease: Disease) {
    this.disease = disease;
  }

}
