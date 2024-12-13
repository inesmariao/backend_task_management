import {
  IsOptional,
  IsString,
  IsEnum,
  IsISO8601,
  Min,
  Max,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { TaskPriority } from '../tasks.schema';

/**
 * DTO for updating an existing task.
 */
export class UpdateTaskDto {
  /**
   * Title of the task.
   * @example "Implement API Endpoints"
   */
  @IsOptional()
  @IsString({ message: 'The title must be a valid string.' })
  @IsNotEmpty({ message: 'The title field cannot be empty.' })
  title?: string;

  /**
   * Description of the task.
   * @example "Develop and test the backend API endpoints for user management."
   */
  @IsOptional()
  @IsString({ message: 'The description must be a valid string.' })
  @IsNotEmpty({ message: 'The description field cannot be empty.' })
  description?: string;

  /**
   * Status of the task.
   * @example "pending"
   */
  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'], {
    message: 'Status must be one of: pending, in-progress, completed.',
  })
  status?: string;

  /**
   * Person assignee for the task.
   * @example "Inés Oliveros"
   */
  @IsOptional()
  @IsString({ message: 'The assignee must be a valid string.' })
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
  @IsNumber({}, { message: 'Rating must be a number.' })
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating cannot exceed 5.' })
  rating?: number;
}
