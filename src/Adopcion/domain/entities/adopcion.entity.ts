import { AggregateRoot } from '@nestjs/cqrs';
import { AdopcionId } from '../value-objects/adopcion-id.value';
import { Email } from '../value-objects/email-value';
//import { Age } from '../value-objects/age.value';
import { AdopcionRegistrado } from '../events/adopcion-registrado.event';
import { Password } from '../../../common/domain/value-objects/password.value';

export class Adopcion extends AggregateRoot {
  private id: AdopcionId;
  private name: string;
  private lastName: string;
  private email: Email;
  private password: Password;
  //private age: Age;

  public constructor(
    id: AdopcionId,
    name: string,
    lastName: string,
    email: Email,
    password: Password,
    //age: Age,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    //this.age = age;
  }

  public register() {
    const event = new AdopcionRegistrado(
      this.id.getValue(),
      this.name,
      this.lastName,
      this.email.getValue(),
      this.password.getValue(),
      //this.age.getAge(),
    );
    this.apply(event);
  }

  public getId(): AdopcionId {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): Email {
    return this.email;
  }
  public getPassword(): Password {
    return this.password;
  }

  /*public getAge(): Age {
    return this.age;
  }*/

  public changeId(id: AdopcionId): void {
    this.id = id;
  }

  public changeName(name: string): void {
    this.name = name;
  }

  public changeLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public changeEmail(email: Email): void {
    this.email = email;
  }

  /*public changeAge(age: Age): void {
    this.age = age;
  }*/

  public changePassword(password: Password) {
    this.password = password;
  }

}
