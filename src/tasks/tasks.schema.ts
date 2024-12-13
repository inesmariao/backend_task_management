import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Enum representing the priority levels of a task.
 */
export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  NORMAL = 'normal',
}

/**
 * Task Document type extending Mongoose's Document interface.
 */
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export type TaskDocument = Task & Document;

/**
 * Schema definition for a Task in the system.
 */
@Schema({ timestamps: true })
export class Task {
  /**
   * Title of the task.
   * @example "Complete API Documentation"
   */
  @ApiProperty({
    description: 'The title of the task',
    example: 'Fix login bug',
  })
  @Prop({ required: true })
  title!: string;

  /**
   * Description of the task.
   * @example "Write detailed API documentation for the Swagger UI."
   */
  @ApiProperty({
    description: 'The description of the task',
    example: 'Write detailed API documentation for the Swagger UI.',
  })
  @Prop({ required: true })
  description!: string;

  /**
   * Status of the task.
   * @example "in-progress"
   */
  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: 'in-progress',
  })
  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status!: TaskStatus;

  /**
   * Logical deletion flag for the task.
   * @example false
   */
  @ApiProperty({
    description: 'Indicates if the task is deleted',
    example: false,
  })
  @Prop({ default: false })
  isDeleted!: boolean;

  /**
   * Person assignee for the task.
   * @example "Inés Oliveros"
   */
  @ApiProperty({
    description: 'The person assignee for the task',
    example: 'Max Burtton',
  })
  @Prop({ required: false })
  assignee?: string;

  /**
   * Priority level of the task.
   * @example "high"
   */
  @ApiProperty({
    description: 'The priority of the task',
    enum: TaskPriority,
    example: 'high',
  })
  @Prop({ enum: TaskPriority, default: TaskPriority.NORMAL })
  priority?: TaskPriority;

  /**
   * Start date of the task.
   * @example "2025-01-01"
   */
  @ApiProperty({
    description: 'The start date of the task',
    example: '2023-12-01',
  })
  @Prop({ required: false })
  startDate?: Date;

  /**
   * End date of the task.
   * @example "2025-01-10"
   */
  @ApiProperty({
    description: 'The end date of the task',
    example: '2023-12-10',
  })
  @Prop({ required: false })
  endDate?: Date;

  /**
   * Rating of the task (applicable after completion).
   * @example 4
   */
  @ApiProperty({
    description: 'The rating of the task',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @Prop({ required: false, min: 1, max: 5 })
  rating?: number;

  /**
   * Date when the task was created.
   * @example "2025-01-01"
   */
  createdAt?: Date;

  /**
   * Date when the task was last updated.
   * @example "2025-01-05"
   */
  updatedAt?: Date;
}

/**
 * Mongoose Schema Factory for the Task model.
 */
export const TaskSchema = SchemaFactory.createForClass(Task);
