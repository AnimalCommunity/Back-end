import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Disease {
  public readonly value: string;
  public static MIN_LENGTH = 4;
  public static MAX_LENGTH = 32;

  public constructor(value: string) {
    this.value = value;
  }

  public static create(disease: string): Result<AppNotification, Disease> {
    const notification: AppNotification = new AppNotification();

    if (disease === '') {
      notification.addError('disease is required', null);
    }

    if (disease.length < this.MIN_LENGTH) {
      notification.addError(
        `The minimum length of a disease id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (disease.length > this.MAX_LENGTH) {
      notification.addError(
        `The maximum length of a disease id ${this.MIN_LENGTH}`,
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    return Result.ok(new Disease(disease));
  }

  public getValue(): string {
    return this.value;
  }
}