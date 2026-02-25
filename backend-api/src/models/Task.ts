import mongoose, { Schema } from 'mongoose';
import { ITask } from '../types';

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.virtual('isOverdue').get(function (this: ITask) {
  return this.status === 'pending' && this.dueDate < new Date();
});

taskSchema.index({ status: 1, isDeleted: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ dueDate: 1 });

taskSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

taskSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

taskSchema.pre('countDocuments', function () {
  this.where({ isDeleted: false });
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
