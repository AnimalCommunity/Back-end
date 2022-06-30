export class UpdateMascotaCommand {
  constructor(
    public readonly targetId: number,
    public readonly id: number,
    public readonly name: string,
    public readonly species: string,
    public readonly disease: string,
    public readonly treatment: string,
    //public readonly age: number
  ) {}
}
