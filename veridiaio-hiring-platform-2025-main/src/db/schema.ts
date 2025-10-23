import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const applications = sqliteTable('applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  position: text('position').notNull(),
  resumeUrl: text('resume_url').notNull(),
  degree: text('degree').notNull(),
  university: text('university').notNull(),
  fieldOfStudy: text('field_of_study').notNull(),
  graduationYear: integer('graduation_year').notNull(),
  status: text('status').notNull().default('received'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const workExperiences = sqliteTable('work_experiences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  applicationId: integer('application_id').notNull().references(() => applications.id),
  position: text('position').notNull(),
  company: text('company').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  description: text('description').notNull(),
  createdAt: text('created_at').notNull(),
});

export const positions = sqliteTable('positions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull().unique(),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull(),
});

export const interviews = sqliteTable('interviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  applicationId: integer('application_id').notNull().references(() => applications.id),
  title: text('title').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  interviewerName: text('interviewer_name').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull().default('scheduled'),
  createdAt: text('created_at').notNull(),
});

export const notifications = sqliteTable('notifications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  applicationId: integer('application_id').notNull().references(() => applications.id),
  message: text('message').notNull(),
  type: text('type').notNull(),
  isRead: integer('is_read', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

export const applicationSteps = sqliteTable('application_steps', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  applicationId: integer('application_id').notNull().references(() => applications.id),
  stepName: text('step_name').notNull(),
  status: text('status').notNull(),
  stepDate: text('step_date').notNull(),
  stepOrder: integer('step_order').notNull(),
  createdAt: text('created_at').notNull(),
});