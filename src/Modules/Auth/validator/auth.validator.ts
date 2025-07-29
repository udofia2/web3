import { z } from "zod";

export class AuthValidator {
  static loginSchema = z.object({
    email: z
      .string({ message: "email is required" })
      .email({ message: "invalid email" })
      .trim(),
    password: z.string({ message: "password is required" }).trim(),
  });

  static registerSchema = z.object({
    email: z
      .string({ message: "email is required" })
      .email({ message: "invalid email" })
      .trim(),
    password: z
      .string({ message: "password is required" })
      .trim()
      .min(8, "password must be at least 8 characters long")
      .refine(
        (value) => {
          // Check if the password contains at least one uppercase letter, one lowercase letter, and one digit
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasDigit = /\d/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

          return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
        },
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        }
      ),
  });

}
