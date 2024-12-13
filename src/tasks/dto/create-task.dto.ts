import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { TaskPriority } from '../tasks.schema';

/**
 * DTO for creating a new task.
 */
export class CreateTaskDto {
  /**
   * Title of the task.
   * @example "Implement API Endpoints"
   */
  @IsString({ message: 'The title must be a valid string.' })
  @IsNotEmpty({ message: 'The title field is required.' })
  title!: string;

  /**
   * Description of the task.
   * @example "Develop and test the backend API endpoints for user management."
   */
  @IsString({ message: 'The description must be a valid string.' })
  @IsNotEmpty({ message: 'The description field is required.' })
  description!: string;

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
  @IsDateString({}, { message: 'startDate must be a valid ISO date string.' })
  startDate?: string;

  /**
   * End date of the task in ISO 8601 format.
   * @example "2025-01-15"
   */
  @IsOptional()
  @IsDateString({}, { message: 'endDate must be a valid ISO date string.' })
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
