import {z as zod} from 'zod';

export const userSchema = ({
    body: zod.object({
        name: zod.string().min(1, 'Name is required'),
        email: zod.string().email('Invalid email address'),
        password: zod.string().min(6, 'Password must be at least 6 characters long'),
        role: zod.enum(['CUSTOMER', 'EVENT_ORGANIZER']),
        referralCode: zod.string().optional(),
    }),
    params: zod.object({
        id: zod.string().nonempty()
    })
})

export const ResetPasswordSchema = zod.object({
    email: zod.string().email("Invalid email"),
    newPassword: zod.string().min(6, "Password must be at least 6 characters")
  });