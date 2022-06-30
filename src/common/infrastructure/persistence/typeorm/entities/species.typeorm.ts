import { Column } from "typeorm";

export class SpeciesTypeORM {
  @Column('varchar', {name: 'species', length: 75, nullable: false })
  public species: string;

  private constructor(species: string) {
    this.species = species;
  }

  public static from(species: string): SpeciesTypeORM {
    return new SpeciesTypeORM(species);
  }
}