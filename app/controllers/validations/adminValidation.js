import { z } from 'zod';

//? update any user request zod validation
const updateAnyUserZodSchema = z.object({
    params: z.object({
        userId: z.string()
    }),
    formData: z.object({
        data: z.string({
            required_error: 'data is required',
        }),
        image: z.object({
            mimetype: z.string().regex(/^image\/(png|jpe?g|jpg)$/i, { message: 'Only png, jpg & jpeg file support!' })
        }).optional(),
    }).passthrough().optional(),
});

export const adminValidation = {
    updateAnyUserZodSchema,
};