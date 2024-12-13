import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Create a new task.
   * @param createTaskDto DTO containing details of the task to be created.
   * @returns The created task.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * Retrieve all active (non-deleted) tasks.
   * @returns List of active tasks.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all active tasks' })
  @ApiResponse({ status: 200, description: 'List of active tasks.' })
  findAllTasks() {
    return this.tasksService.findAll();
  }

  /**
   * Retrieve a specific task by its ID.
   * @param id The ID of the task to retrieve.
   * @returns The requested task.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by its ID' })
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findTaskById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  /**
   * Update an existing task.
   * @param id The ID of the task to update.
   * @param updateTaskDto DTO containing updated details of the task.
   * @returns The updated task.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Logically delete a task by its ID.
   * @param id The ID of the task to delete.
   * @returns A message confirming deletion.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.delete(id);
    return { message: 'The task was successfully deleted.' };
  }

  /**
   * Restore a logically deleted task by its ID.
   * @param id The ID of the task to restore.
   * @returns A message confirming restoration and the restored task.
   */
  @Patch(':id/restore')
  @ApiOperation({ summary: 'Restore a logically deleted task' })
  @ApiResponse({ status: 200, description: 'Task restored successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found or not deleted.' })
  async restore(@Param('id') id: string) {
    const restoredTask = await this.tasksService.restore(id);
    return {
      message: 'The task was successfully restored.',
      task: restoredTask,
    };
  }

  /**
   * Retrieve all logically deleted tasks.
   * @returns List of deleted tasks.
   */
  @Get('/deleted')
  @ApiOperation({ summary: 'Retrieve all logically deleted tasks' })
  @ApiResponse({ status: 200, description: 'List of deleted tasks.' })
  findDeleted() {
    return this.tasksService.findDeleted();
  }
}
