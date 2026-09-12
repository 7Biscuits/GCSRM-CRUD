import mongoose, { Document, Schema } from 'mongoose';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface ITask {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskDocument extends ITask, Document {}

const taskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in_progress', 'completed'],
        message: 'Status must be pending, in_progress, or completed',
      },
      default: 'pending',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITaskDocument>('Task', taskSchema);