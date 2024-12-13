import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskPriority } from './tasks.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import mongoose from 'mongoose';

/**
 * Test suite for the TasksService.
 */
describe('TasksService', () => {
  let service: TasksService;
  let model: Model<TaskDocument>;

  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    assignee: 'Max Fox',
    priority: TaskPriority.HIGH,
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-10'),
    rating: 4,
    isDeleted: false,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-05'),
  };

  const tasksMock = [
    { ...mockTask, _id: '1' },
    { ...mockTask, _id: '2', title: 'Another Task' },
  ];

  const mockTaskModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(tasksMock),
    }),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTask),
    }),
    create: jest.fn().mockImplementation((dto) => ({
      ...dto,
      _id: '3',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue({ ...mockTask, ...{ title: 'Updated Task' } }),
    }),
    updateOne: jest
      .fn()
      .mockResolvedValue({ acknowledged: true, modifiedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<TaskDocument>>(getModelToken(Task.name));
  });

  /**
   * Ensure the service is defined.
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * Test retrieving all tasks.
   */
  it('should return all tasks', async () => {
    const tasks = await service.findAll();
    expect(tasks).toEqual(tasksMock);
    expect(model.find).toHaveBeenCalledWith({ isDeleted: false });
  });

  /**
   * Test creating a new task.
   */
  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'New Task',
      description: 'New Task Description',
      assignee: 'Emilian Roe',
      priority: TaskPriority.MEDIUM,
      startDate: '2024-12-01',
      endDate: '2024-12-15',
      rating: 5,
    };

    const createdTask = await service.create(createTaskDto);
    expect(createdTask).toEqual({
      ...createTaskDto,
      _id: '3',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
    expect(model.create).toHaveBeenCalledWith(createTaskDto);
  });

  it('should update a task', async () => {
    const updateTaskDto: UpdateTaskDto = {
      assignee: 'Updated assignee',
      priority: TaskPriority.NORMAL,
      startDate: '2024-12-05',
      endDate: '2024-12-20',
      rating: 3,
    };

    const updatedTask = await service.update('1', updateTaskDto);
    expect(updatedTask).toEqual({
      ...mockTask,
      ...updateTaskDto,
      title: 'Updated Task',
    });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateTaskDto, {
      new: true,
    });
  });

  it('should delete a task', async () => {
    const deleteResponse = await service.delete('1');
    expect(model.updateOne).toHaveBeenCalledWith(
      { _id: '1' },
      { isDeleted: true }
    );
    expect(deleteResponse).toBeUndefined();
  });

  /**
   * Cleanup after all tests.
   */
  afterAll(async () => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });
});
