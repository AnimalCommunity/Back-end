export class RegisterUsuarioRequestDto {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly email: string,
    //public readonly age: number
  ) {}
}