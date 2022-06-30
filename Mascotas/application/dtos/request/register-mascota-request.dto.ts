export class RegisterMascotaRequestDto {
  constructor(
    public readonly name: string,
    public readonly species: string,
    public readonly disease: string,
    public readonly treatment: string,
    //public readonly age: number
  ) {}
}