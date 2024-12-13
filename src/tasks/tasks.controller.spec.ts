import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskPriority } from './tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * Unit tests for the TasksController.
 */
describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  // Mock implementation of the TasksService
  const mockTasksService = {
    create: jest.fn((dto: CreateTaskDto) => ({ ...dto, _id: '1' })),
    findAll: jest.fn(() => [
      {
        _id: '1',
        title: 'Test Task',
        description: 'Task description',
        assignee: 'Mary Green',
        priority: TaskPriority.HIGH,
        startDate: new Date('2023-12-01T00:00:00Z'),
        endDate: new Date('2023-12-10T00:00:00Z'),
        rating: 4,
        isDeleted: false,
      },
    ]),
    findById: jest.fn((id: string) => ({
      _id: id,
      title: 'Found Task',
      description: 'Task description',
      assignee: 'Paul Mark',
      priority: TaskPriority.MEDIUM,
      startDate: new Date('2023-12-01T00:00:00Z'),
      endDate: new Date('2023-12-15T00:00:00Z'),
      rating: 3,
      isDeleted: false,
    })),
    update: jest.fn((id: string, dto: UpdateTaskDto) => ({ ...dto, _id: id })),
    delete: jest.fn((id: string) => ({
      message: `Task with ID ${id} deleted.`,
    })),
    restore: jest.fn((id: string) => ({
      _id: id,
      title: 'Restored Task',
      description: 'Restored task description',
      assignee: 'Christian Cage',
      priority: TaskPriority.NORMAL,
      startDate: new Date('2023-12-01T00:00:00Z'),
      endDate: new Date('2023-12-10T00:00:00Z'),
      rating: 4,
      isDeleted: false,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all tasks', async () => {
    const tasks = await controller.findAllTasks();
    expect(tasks).toEqual(mockTasksService.findAll());
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a task', async () => {
    const dto: CreateTaskDto = {
      title: 'New Task',
      description: 'Task description',
      assignee: 'Hanna Bill',
      priority: TaskPriority.HIGH,
      startDate: '2023-12-01T00:00:00Z',
      endDate: '2023-12-10T00:00:00Z',
      rating: 5,
    };

    const task = await controller.createTask(dto);
    expect(task).toEqual(mockTasksService.create(dto));
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return a task by ID', async () => {
    const task = await controller.findTaskById('1');
    expect(task).toEqual(mockTasksService.findById('1'));
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should update a task', async () => {
    const dto: UpdateTaskDto = {
      assignee: 'Updated assignee',
      priority: TaskPriority.MEDIUM,
      startDate: '2023-12-01T00:00:00Z',
      endDate: '2023-12-15T00:00:00Z',
      rating: 4,
    };

    const updatedTask = await controller.updateTask('1', dto);
    expect(updatedTask).toEqual(mockTasksService.update('1', dto));
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should delete a task', async () => {
    const response = await controller.deleteTask('1');
    expect(response).toEqual({ message: 'The task was successfully deleted.' });
    expect(service.delete).toHaveBeenCalledWith('1');
  });

  it('should restore a deleted task', async () => {
    const restoredTask = await controller.restore('1');
    expect(restoredTask).toEqual({
      message: 'The task was successfully restored.',
      task: mockTasksService.restore('1'),
    });
    expect(service.restore).toHaveBeenCalledWith('1');
  });
});
