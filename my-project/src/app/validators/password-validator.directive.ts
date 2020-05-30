import { Directive } from "@angular/core";
import { ValidatorFn, AbstractControl } from "@angular/forms";

@Directive({
  selector: "[appPasswordValidator]"
})
export class PasswordValidatorDirective {
  constructor() {}
}

export function passwordsMatch(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid =
      control.parent.controls["repeatedPassword"].value ===
      control.parent.controls[controlName].value;
    return isValid ? null : { passwordsMatch: { value: control.value } };
  };
}
