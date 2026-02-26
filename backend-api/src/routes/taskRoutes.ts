import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  setTaskStatus,
  deleteTask,
  getStats,
} from '../controllers/taskController';
import {
  validateCreateTask,
  validateUpdateTask,
  validateSetStatus,
  validateObjectId,
  handleValidationErrors,
} from '../middleware/validateTask';

const router = Router();

// Stats route MUST be before /:id to avoid matching "stats" as an id
router.get('/stats', getStats);

router.get('/', getTasks);
router.post('/', validateCreateTask, handleValidationErrors, createTask);

router.get('/:id', validateObjectId, handleValidationErrors, getTask);
router.put('/:id', [...validateObjectId, ...validateUpdateTask], handleValidationErrors, updateTask);
router.patch('/:id/status', [...validateObjectId, ...validateSetStatus], handleValidationErrors, setTaskStatus);
router.delete('/:id', validateObjectId, handleValidationErrors, deleteTask);

export default router;
