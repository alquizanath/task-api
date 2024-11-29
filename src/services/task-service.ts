import task from "../models/task.model";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTaskFilterDto } from "../dto/get-task-filter.dto";
import { UpdateTaskDto } from "src/dto/update-task.dto";
import CustomError from "../common/custom-error";
import { HttpStatusCode, TaskStatusEnum } from "../types/enums";

class TaskService {
  createTask = async (dto: CreateTaskDto) => {
    return await task.create(dto);
  };

  getTasks = async (filter: GetTaskFilterDto) => {
    const results = await task.findAll(filter);
    return results;
  };

  getTaskById = async (id: number) => {
    const result = await task.findById(id);

    if (!result)
      throw new CustomError(
        `Entity with id ${id} not found`,
        HttpStatusCode.NOT_FOUND
      );

    return result;
  };

  updateTask = async (id: number, dto: UpdateTaskDto): Promise<any> => {
    return await task.update(id, dto);
  };

  updateTaskStatus = async (
    id: number,
    status: TaskStatusEnum
  ): Promise<any> => {
    const entity = await task.findOne({ id });
    if (!entity) {
      throw new CustomError(
        `Entity with id ${id} not found`,
        HttpStatusCode.NOT_FOUND
      );
    }

    return await task.update(id, { status });
  };

  deleteTask = async (id: number): Promise<any> => {
    return await task.delete(id);
  };
}

const taskService = new TaskService();

export default taskService;
