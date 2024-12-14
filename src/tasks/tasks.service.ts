import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './tasks.schema';
import { Logger } from '@nestjs/common';

/**
 * Service layer for managing tasks.
 */
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  /**
   * Create a new task.
   * @param createTaskDto DTO containing task details.
   * @returns The created task.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = new this.taskModel(createTaskDto);
      return await newTask.save();
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to save the task: ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error(
        'An error occurred while saving the task. Please verify the data and try again.'
      );
    }
  }

  /**
   * Retrieve all active (non-deleted) tasks.
   * @returns List of active tasks.
   */
  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find({ isDeleted: false }).exec();

      if (tasks.length > 1) {
        tasks.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
      }

      return tasks.map((task) => task.toObject());
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to fetch tasks: ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error(
        'An error occurred while fetching tasks. Please try again later.'
      );
    }
  }

  /**
   * Retrieve a task by its ID.
   * @param id The ID of the task.
   * @returns The requested task.
   */
  async findById(id: string): Promise<Task> {
    try {
      const task = await this.taskModel
        .findOne({ _id: id, isDeleted: false })
        .exec();

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" was not found.`);
      }

      return task;
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to find task with ID "${id}": ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error('An error occurred while fetching the task.');
    }
  }

  /**
   * Update a task.
   * @param id The ID of the task to update.
   * @param updateTaskDto DTO containing updated task details.
   * @returns The updated task.
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const updatedTask = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .exec();

      if (!updatedTask) {
        throw new NotFoundException(`Task with ID "${id}" was not found.`);
      }

      return updatedTask;
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to update task with ID "${id}": ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error(
        'An error occurred while updating the task. Please verify the data and try again.'
      );
    }
  }

  /**
   * Logically delete a task.
   * @param id The ID of the task to delete.
   */
  async delete(id: string): Promise<void> {
    try {
      const task = await this.taskModel.findOne({ _id: id }).exec();

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" was not found.`);
      }

      if (task.isDeleted) {
        throw new NotFoundException(
          `Task with ID "${id}" is already marked as deleted.`
        );
      }

      await this.taskModel.updateOne({ _id: id }, { isDeleted: true }).exec();
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to delete task with ID "${id}": ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error(
        'An error occurred while deleting the task. Please try again later.'
      );
    }
  }

  /**
   * Restore a logically deleted task.
   * @param id The ID of the task to restore.
   * @returns The restored task.
   */
  async restore(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findOne({ _id: id }).exec();
  
      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" was not found or is not marked as deleted.`);
      }
  
      if (!task.isDeleted) {
        throw new NotFoundException(
          `Task with ID "${id}" is not marked as deleted. Current isDeleted: ${task.isDeleted}`
        );
      }
  
      task.isDeleted = false;
      await task.save();
  
      return task;
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to restore task with ID "${id}": ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error(
        'An error occurred while restoring the task. Please try again later.'
      );
    }
  }

  /**
   * Retrieve all logically deleted tasks.
   * @returns List of deleted tasks.
   */
  async findDeleted(): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find({ isDeleted: true }).exec();
      return tasks;
    } catch (error) {
      const err = error as Error;
      Logger.error(
        `Failed to fetch deleted tasks: ${err.message}`,
        err.stack,
        'TasksService'
      );
      throw new Error('An error occurred while fetching deleted tasks.');
    }
  }
}
