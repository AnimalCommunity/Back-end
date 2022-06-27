/*import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';

export class Age {
  private readonly age: number;
  private static MIN_AGE = 18;

  private constructor(age: number) {
    this.age = age;
  }

  public getAge(): number {
    return this.age;
  }

  public static create(
    age: number,
  ): Result<AppNotification, Age> {
    const notification: AppNotification = new AppNotification();

    age = (age ?? 0);

    if (age < this.MIN_AGE) {
      notification.addError(
        `The age entered must be greater than ${this.MIN_AGE} years old`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Age(age));
  }
}*/