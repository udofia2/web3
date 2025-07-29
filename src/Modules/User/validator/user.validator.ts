import { z } from "zod";

export class UserValidator {
  static updateProfileSchema = z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name too long")
        .optional(),
      lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name too long")
        .optional(),
      otherNames: z.string().trim().max(100, "Other names too long").optional(),
      phoneNumber: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
        .optional(),
      title: z.string().trim().max(20, "Title too long").optional(),
    })
    .refine(
      (data) => {
        return Object.values(data).some(
          (value) => value !== undefined && value !== ""
        );
      },
      {
        message: "At least one field must be provided for update",
      }
    );

        static resetTransactionPinSchema = z
        .object({
            sessionId: z
                .string({ message: "Session ID is required" })
                .trim()
                .min(1, "Session ID cannot be empty"),
            newPin: z
                .string({ message: "New PIN is required" })
                .trim()
                .length(4, "PIN must be exactly 4 digits")
                .regex(/^\d{4}$/, "PIN must contain only digits"),
            confirmPin: z
                .string({ message: "Confirm PIN is required" })
                .trim()
                .length(4, "Confirm PIN must be exactly 4 digits")
        })
        .refine((data) => data.newPin === data.confirmPin, {
            message: "PIN and confirm PIN do not match",
            path: ["confirmPin"],
        })
        .refine((data) => data.newPin !== "0000", {
            message: "PIN cannot be 0000",
            path: ["newPin"],
        });
        
  static changePasswordSchema = z
    .object({
      oldPassword: z
        .string({ message: "old password is required" })
        .trim()
        .min(1, "old password cannot be empty"),
      newPassword: z
        .string({ message: "new password is required" })
        .trim()
        .min(8, "new password must be at least 8 characters long")
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
              "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
          }
        ),
      confirmPassword: z
        .string({ message: "confirm password is required" })
        .trim()
        .min(1, "confirm password cannot be empty"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "New password and confirm password do not match",
      path: ["confirmPassword"],
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "New password must be different from old password",
      path: ["newPassword"],
    });

  static requestPinResetSchema = z.object({
    method: z.enum(["email", "sms"], {
      message: "Method must be either 'email' or 'sms'",
    }),
  });

  static verifyPinResetOtpSchema = z.object({
    sessionId: z
      .string({ message: "Session ID is required" })
      .trim()
      .min(1, "Session ID cannot be empty"),
    otp: z
      .string({ message: "OTP is required" })
      .trim()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^\d{6}$/, "OTP must contain only digits"),
  });

  static setTransactionPinSchema = z
    .object({
      pin: z
        .string({ message: "PIN is required" })
        .trim()
        .length(4, "PIN must be exactly 4 digits")
        .regex(/^\d{4}$/, "PIN must contain only digits"),
      confirmPin: z
        .string({ message: "Confirm PIN is required" })
        .trim()
        .length(4, "Confirm PIN must be exactly 4 digits"),
      password: z
        .string({ message: "Current password is required" })
        .trim()
        .min(1, "Current password cannot be empty"),
    })
    .refine((data) => data.pin === data.confirmPin, {
      message: "PIN and confirm PIN do not match",
      path: ["confirmPin"],
    })
    .refine((data) => data.pin !== "0000", {
      message: "PIN cannot be 0000",
      path: ["pin"],
    });
}
