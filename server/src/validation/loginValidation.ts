import { LoginInput } from "../resolvers/User/LoginInput";
import { User } from "../entities/User";
import { FieldError } from "../resolvers/User";
import { isEmpty } from "./registerValidation";

interface LoginValidationResults {
  errors: FieldError[];
  user?: User;
}

export const loginValidation = async (
  options: LoginInput
): Promise<LoginValidationResults> => {
  let errors: FieldError[] = [];

  if (isEmpty(options.password)) {
    errors.push({ field: "password", message: "Please enter your password" });
  }

  if (isEmpty(options.emailOrUsername)) {
    errors.push({
      field: "emailOrUsername",
      message: "Please enter email or username",
    });
  } else {
    const user = await User.findOne(
      options.emailOrUsername.includes("@")
        ? { email: options.emailOrUsername }
        : { username: options.emailOrUsername }
    );
    if (!user) {
      errors.push({
        field: "emailOrUsername",
        message: "Email or username does not match any of our users",
      });
      return { errors };
    }

    if (errors.length > 0) return { errors };

    return { user, errors };
  }
  return { errors };
};
