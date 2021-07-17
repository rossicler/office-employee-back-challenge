import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { Employee } from "../models/employee";
import { ValidationUtils } from "../utils/validation";

interface IAuthRequest {
  username: string;
  password: string;
}

export class AuthService {
  async execute({ username, password }: IAuthRequest) {
    const requiredFields = ["username", "password"];
    const validationUtils = new ValidationUtils();
    const missingKeys = validationUtils.requiredFields(requiredFields, {
      username,
      password,
    });
    if (missingKeys.length > 0) {
      throw new Error("Missing fields: " + missingKeys.join(", "));
    }

    const user = await Employee.findOne({
      username,
    }).exec();
    if (!user) {
      throw new Error("Username or password invalid");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Username or password invalid");
    }

    const token = sign(
      {
        username: user.username,
      },
      process.env.AUTH_KEY,
      {
        subject: user._id.toString(),
        expiresIn: "1d",
      }
    );

    return token;
  }
}
