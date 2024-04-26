import { z } from 'zod';

//? update user/admin request zod validation
const updateUserZodSchema = z.object({
    formData: z.object({
        data: z.string({
            required_error: 'data is required',
        }),
        image: z.object({
            mimetype: z.string().regex(/^image\/(png|jpe?g|jpg)$/i, { message: 'Only png, jpg & jpeg file support!' })
        }).optional(),
    }).passthrough().optional(),
});

export const userValidation = {
    updateUserZodSchema,
};