import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(2),
    email: z.string().email(),
    gender: z.enum(['male', 'female']),
    status: z.enum(['active', 'inactive'])
});

export const usersArraySchema = z.array(userSchema);