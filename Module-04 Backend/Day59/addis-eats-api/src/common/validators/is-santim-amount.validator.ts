import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isSantimAmount', async: false })
export class IsSantimAmountConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return (
      typeof value === 'number' &&
      Number.isInteger(value) &&
      value > 0 &&
      value <= 10_000_000
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a positive integer between 1 and 10000000 santim`;
  }
}

export function IsSantimAmount(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSantimAmount',
      target: object.constructor,
      propertyName,
      options,
      validator: IsSantimAmountConstraint,
    });
  };
}
