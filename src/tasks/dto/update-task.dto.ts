import {
  IsOptional,
  IsString,
  IsEnum,
  IsISO8601,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { TaskPriority } from '../tasks.schema';

/**
 * DTO for updating an existing task.
 */
export class UpdateTaskDto {
  /**
   * Person assignee for the task.
   * @example "Inés Oliveros"
   */
  @IsOptional()
  @IsString()
  assignee?: string;

  /**
   * Priority of the task.
   * @example "high"
   */
  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'Priority must be one of: high, medium, normal.',
  })
  priority?: TaskPriority;

  /**
   * Start date of the task in ISO 8601 format.
   * @example "2025-01-01"
   */
  @IsOptional()
  @IsISO8601({}, { message: 'startDate must be a valid ISO 8601 date string.' })
  startDate?: string;

  /**
   * End date of the task in ISO 8601 format.
   * @example "2025-01-15"
   */
  @IsOptional()
  @IsISO8601({}, { message: 'endDate must be a valid ISO 8601 date string.' })
  endDate?: string;

  /**
   * Rating of the task (1 to 5).
   * @example 4
   */
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating cannot exceed 5.' })
  rating?: number;
}
