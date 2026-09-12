import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { ITaskDocument, Task } from '../models/task.model';

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'pending',
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch all tasks (with optional filtering by status or title)
// @route   GET /api/tasks
export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, title } = req.query;
    const filter: FilterQuery<ITaskDocument> = {};

    if (status && typeof status === 'string') {
      filter.status = status;
    }

    if (title && typeof title === 'string') {
      filter.title = { $regex: title, $options: 'i' };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve specific task by ID
// @route   GET /api/tasks/:id
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve specific task by title
// @route   GET /api/tasks/title/:title
export const getTaskByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const titleParam = req.params.title.trim();
    const task = await Task.findOne({
      title: { $regex: new RegExp(`^${titleParam}$`, 'i') },
    });

    if (!task) {
      res.status(404).json({
        success: false,
        message: `Task with title '${titleParam}' not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Modify existing task details and status
// @route   PUT /api/tasks/:id
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove task by ID
// @route   DELETE /api/tasks/:id
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};
