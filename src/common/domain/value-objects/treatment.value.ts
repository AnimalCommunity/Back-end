import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Treatment {
  public readonly value: string;
  public static MIN_LENGTH = 4;
  public static MAX_LENGTH = 32;

  public constructor(value: string) {
    this.value = value;
  }

  public static create(treatment: string): Result<AppNotification, Treatment> {
    const notification: AppNotification = new AppNotification();

    if (treatment === '') {
      notification.addError('treatment is required', null);
    }

    if (treatment.length < this.MIN_LENGTH) {
      notification.addError(
        `The minimum length of a treatment id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (treatment.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of a treatment id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Treatment(treatment));
  }

  public getValue(): string {
    return this.value;
  }
}