export class UsuarioRegistrado {
  constructor(
    public readonly id: number,
    public readonly firstname: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string

    //public readonly age: number
  ) {}
}