import { z } from 'zod'

export class UserValidator {
    static updateProfileSchema = z.object({
        firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50, "First name too long").optional(),
        lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50, "Last name too long").optional(),
        otherNames: z.string().trim().max(100, "Other names too long").optional(),
        phoneNumber: z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format").optional(),
        title: z.string().trim().max(20, "Title too long").optional(),
    }).refine((data) => {
        // At least one field must be provided
        return Object.values(data).some(value => value !== undefined && value !== "");
    }, {
        message: "At least one field must be provided for update"
    })
}