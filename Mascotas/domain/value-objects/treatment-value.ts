import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Treatment {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(treatment: string): Result<AppNotification, Treatment>
  {
    let notification: AppNotification = new AppNotification();
    treatment = (treatment ?? "").trim();
    const treatmentMaxLength = 150;
    if (treatment === "") {
      notification.addError('address is required', null);
    }
    if (treatment.length > treatmentMaxLength) {
      notification.addError('The maximum length of an treatment is ' + treatmentMaxLength + ' characters including spaces', null);
    }
    /*const regExp = new RegExp('^(.+)@(.+)$');
    if (regExp.test(treatment) === false) {
      notification.addError('treatment format is invalid', null);
    }*/
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Treatment(treatment));
  }

  public getValue(): string {
    return this.value;
  }
}