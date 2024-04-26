import { z } from 'zod';
import { ENUM_USER_ROLE } from '../../../utils/constants/constants.js';

//? login request zod validation
const loginZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }).email({ message: 'Invalid email format' }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

//? registration request zod validation
const registerZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Email is required',
        }),
        email: z.string({
            required_error: 'Email is required',
        }).email({
            message: 'Invalid email format'
        }),
        password: z.string({
            required_error: 'Password is required',
        }).min(
            6, 'Password must be at least 6 characters long'
        ),
        role: z.enum(Object.values(ENUM_USER_ROLE), {
            required_error: 'Role is required',
        }).default(ENUM_USER_ROLE.USER),
    }),
});

export const authValidation = {
    loginZodSchema,
    registerZodSchema
};