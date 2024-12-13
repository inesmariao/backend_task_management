import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';

/**
 * Repository for managing tasks in the database.
 * Provides methods for CRUD operations.
 */
@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  /**
   * Creates a new task in the database.
   *
   * @param task - The task data to be created.
   * @returns A promise that resolves to the created task.
   */
  async create(task: Partial<Task>): Promise<Task> {
    return new this.taskModel(task).save();
  }

  /**
   * Retrieves all tasks from the database.
   *
   * @returns A promise that resolves to an array of tasks.
   */
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  /**
   * Retrieves a specific task by its ID.
   *
   * @param id - The ID of the task to be retrieved.
   * @returns A promise that resolves to the task or null if not found.
   */
  async findById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  /**
   * Updates a specific task by its ID.
   *
   * @param id - The ID of the task to be updated.
   * @param task - The updated task data.
   * @returns A promise that resolves to the updated task or null if not found.
   */
  async update(id: string, task: Partial<Task>): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }
  /**
   * Deletes a specific task by its ID.
   *
   * @param id - The ID of the task to be deleted.
   * @returns A promise that resolves once the task is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
