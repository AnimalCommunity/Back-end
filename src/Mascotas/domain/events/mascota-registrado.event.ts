export class MascotaRegistrado {
  constructor(
    public readonly id: number,
    public readonly firstname: string,
    public readonly species: string,
    public readonly treatment: string,
    public readonly disease: string

    //public readonly age: number
  ) {}
}