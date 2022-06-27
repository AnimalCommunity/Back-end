import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Password {
  public readonly value: string;
  public static MIN_LENGTH = 6;
  public static MAX_LENGTH = 32;

  public constructor(value: string) {
    this.value = value;
  }

  public static create(password: string): Result<AppNotification, Password> {
    const notification: AppNotification = new AppNotification();

    password = (password ?? '').trim();

    if (password === '') {
      notification.addError('password is required', null);
    }

    if (password.length < this.MIN_LENGTH) {
      notification.addError(
        `The minimum length of a password id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (password.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of a password id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Password(password));
  }

  public getValue(): string {
    return this.value;
  }
}