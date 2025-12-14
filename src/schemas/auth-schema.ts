import z from "zod";

const refineRegex = /\s/;

const emailSchema = z.email("Provide a valid email address");
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be at most 128 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter.")
    .regex(/[0-9]/, "Password must include at least one number.")
    .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character."
    )
    .refine((val) => !refineRegex.test(val), {
        message: "Password cannot contain spaces.",
    });

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    rememberMe: z.boolean(),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: emailSchema,
    password: passwordSchema,
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const updateProflieSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    image: z.string(),
});
export type UpdateProfileInput = z.infer<typeof updateProflieSchema>;

export const updatePasswordSchema = z.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
});
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
