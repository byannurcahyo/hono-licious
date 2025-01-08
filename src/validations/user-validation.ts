import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(8).max(20),
        name: z.string().min(3).max(30),
        role: z.enum(["admin", "user"]).optional(),
    });

    static readonly UPDATE: ZodType = z.object({
        username: z.string().min(3).max(20).optional(),
        password: z.string().min(8).max(20).optional(),
        name: z.string().min(3).max(30).optional(),
        role: z.enum(["admin", "user"]).optional(),
    });
}
