import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTaskByTitle,
  updateTask,
} from '../controllers/task.controller';
import {
  validateCreateTask,
  validateTaskId,
  validateUpdateTask,
} from '../middleware/validation.middleware';

const router = Router();

router.post('/', validateCreateTask, createTask);
router.get('/', getAllTasks);
router.get('/title/:title', getTaskByTitle);
router.get('/:id', validateTaskId, getTaskById);
router.put('/:id', validateTaskId, validateUpdateTask, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

export default router;
