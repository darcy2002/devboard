import { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Task';
import { ApiError } from '../utils/ApiError';

export const getStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const [stats] = await Task.aggregate([
      { $match: { isDeleted: false } },
      {
        $facet: {
          total: [{ $count: 'count' }],
          completed: [{ $match: { status: 'completed' } }, { $count: 'count' }],
          pending: [{ $match: { status: 'pending' } }, { $count: 'count' }],
          inProgress: [{ $match: { status: 'in_progress' } }, { $count: 'count' }],
          overdue: [
            { $match: { status: { $in: ['pending', 'in_progress'] }, dueDate: { $lt: now } } },
            { $count: 'count' },
          ],
          byPriority: [
            { $group: { _id: '$priority', count: { $sum: 1 } } },
          ],
          byStatus: [
            { $group: { _id: '$status', count: { $sum: 1 } } },
          ],
        },
      },
    ]);

    const extract = (arr: { count: number }[]) => arr[0]?.count || 0;
    const mapToObj = (arr: { _id: string; count: number }[], keys: string[]) => {
      const obj: Record<string, number> = {};
      keys.forEach((k) => (obj[k] = 0));
      arr.forEach((item) => (obj[item._id] = item.count));
      return obj;
    };

    res.json({
      success: true,
      data: {
        total: extract(stats.total),
        completed: extract(stats.completed),
        pending: extract(stats.pending),
        inProgress: extract(stats.inProgress),
        overdue: extract(stats.overdue),
        byPriority: mapToObj(stats.byPriority, ['low', 'medium', 'high']),
        byStatus: mapToObj(stats.byStatus, ['pending', 'in_progress', 'completed']),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, priority } = req.query;
    const filter: Record<string, string> = {};

    if (status && ['pending', 'in_progress', 'completed'].includes(status as string)) {
      filter.status = status as string;
    }
    if (priority && ['low', 'medium', 'high'].includes(priority as string)) {
      filter.priority = priority as string;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw ApiError.notFound('Task not found');
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;
    const task = await Task.create({ title, description, priority, dueDate, status });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      throw ApiError.notFound('Task not found');
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const setTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw ApiError.notFound('Task not found');
    }
    task.status = status;
    await task.save();
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
