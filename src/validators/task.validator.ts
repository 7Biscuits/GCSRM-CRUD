import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string({ error: 'Title is required and cannot be empty' })
    .trim()
    .min(1, 'Title is required and cannot be empty'),
  description: z.string().trim().optional(),
  status: z
    .enum(['pending', 'in_progress', 'completed'], {
      error: 'Status must be one of: pending, in_progress, completed',
    })
    .optional(),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'dueDate must be a valid date' })
    .nullable()
    .optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'Title cannot be empty').optional(),
    description: z.string().trim().optional(),
    status: z
      .enum(['pending', 'in_progress', 'completed'], {
        error: 'Status must be one of: pending, in_progress, completed',
      })
      .optional(),
    dueDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: 'dueDate must be a valid date' })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: 'At least one field (title, description, status, dueDate) must be provided to update' }
  );

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
