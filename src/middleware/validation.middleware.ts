import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';

export const validateTaskId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: 'Invalid task ID format',
    });
    return;
  }
  next();
};

export const validateBody = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issues = (result.error as any).issues || (result.error as any).errors || [];
      const errors = issues.map((issue: any) => issue.message);

      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

export const validateCreateTask = validateBody(createTaskSchema);
export const validateUpdateTask = validateBody(updateTaskSchema);
