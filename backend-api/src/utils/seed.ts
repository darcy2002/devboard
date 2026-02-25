import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Task } from '../models/Task';

const seedTasks = [
  {
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2025-12-15'),
  },
  {
    title: 'Fix authentication bug',
    description: 'Users are getting logged out unexpectedly after 5 minutes',
    status: 'pending',
    priority: 'high',
    dueDate: new Date('2025-01-10'), // overdue
  },
  {
    title: 'Design landing page',
    description: 'Create wireframes and mockups for the new landing page',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date('2025-11-30'),
  },
  {
    title: 'Write API documentation',
    description: 'Document all REST endpoints with request/response examples',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2026-03-15'),
  },
  {
    title: 'Database optimization',
    description: 'Add indexes and optimize slow queries in MongoDB',
    status: 'pending',
    priority: 'high',
    dueDate: new Date('2025-02-01'), // overdue
  },
  {
    title: 'Implement dark mode',
    description: 'Add dark mode toggle with system preference detection',
    status: 'pending',
    priority: 'low',
    dueDate: new Date('2026-04-01'),
  },
  {
    title: 'Code review standards',
    description: 'Draft code review guidelines and PR template for the team',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date('2025-10-20'),
  },
  {
    title: 'Set up monitoring alerts',
    description: 'Configure alerts for error rates and response times',
    status: 'pending',
    priority: 'high',
    dueDate: new Date('2026-03-01'),
  },
  {
    title: 'Refactor user service',
    description: 'Break down the monolithic user service into smaller modules',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2025-03-10'), // overdue
  },
  {
    title: 'Update dependencies',
    description: 'Update all npm packages to latest stable versions',
    status: 'completed',
    priority: 'low',
    dueDate: new Date('2025-12-01'),
  },
  {
    title: 'Mobile responsive fixes',
    description: 'Fix layout issues on tablet and mobile viewports',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2026-03-20'),
  },
  {
    title: 'Performance audit',
    description: 'Run Lighthouse audit and fix all critical performance issues',
    status: 'pending',
    priority: 'low',
    dueDate: new Date('2026-05-01'),
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  await Task.deleteMany({});
  console.log('Cleared existing tasks');

  await Task.insertMany(seedTasks);
  console.log(`Seeded ${seedTasks.length} tasks`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
