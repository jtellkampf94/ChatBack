import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

import { User } from "../entities/User";

@ValidatorConstraint({ async: true })
export class isUserAlreadyExists implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return User.findOne({ where: { [args.property]: value } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsUserAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isUserAlreadyExists,
    });
  };
}
