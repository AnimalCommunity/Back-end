export class UpdateUsuarioCommand {
  constructor(
    public readonly targetId: number,
    public readonly id: number,
    public readonly name: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly email: string,
    //public readonly age: number
  ) {}
}
