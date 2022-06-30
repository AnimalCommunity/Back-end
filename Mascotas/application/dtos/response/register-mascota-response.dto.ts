export class RegisterMascotaResponseDto {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly species: string,
    public readonly disease: string,
    public readonly treatment: string,
    //public readonly age: number
  ) {}
}