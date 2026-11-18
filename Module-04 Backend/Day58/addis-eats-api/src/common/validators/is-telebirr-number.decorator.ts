import { registerDecorator, type ValidationOptions } from 'class-validator';

export const TELEBIRR_REGEX = /^(?:\+251|0)9\d{8}$/;

export function IsTeleBirrNumber(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTeleBirrNumber',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown): boolean {
          return typeof value === 'string' && TELEBIRR_REGEX.test(value);
        },
        defaultMessage(): string {
          return 'Phone must be a valid TeleBirr number: 09xxxxxxxx or +2519xxxxxxxx';
        },
      },
    });
  };
}
