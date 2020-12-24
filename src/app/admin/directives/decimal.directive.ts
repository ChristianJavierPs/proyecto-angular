import { AbstractControl, ValidatorFn } from '@angular/forms';

export function decimalValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value.toString();

    const [, decimal] = value.split('.');

    return decimal
      ? decimal.length <= 2
      ? null
      : { decimal: { value }}
      : null;
  };
}
