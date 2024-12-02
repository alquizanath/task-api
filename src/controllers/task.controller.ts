import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "@types";

import taskService from "@services/task-service";
import { CreateTaskDto } from "@dto/create-task.dto";
import { GetTaskFilterDto } from "@dto/get-task-filter.dto";
import { UpdateTaskStatusDto } from "@dto/update-task-status.dto";
import { UpdateTaskDto } from "@dto/update-task.dto";

class TaskController {
  createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const results = await taskService.createTask(req.body as CreateTaskDto);
      return res.status(HttpStatusCode.CREATED).send(results);
    } catch (e) {
      next(e);
    }
  };

  getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const results = await taskService.getTasks(
        req.query as unknown as GetTaskFilterDto
      );
      return res.status(HttpStatusCode.OK).send({ data: results });
    } catch (e) {
      next(e);
    }
  };

  getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    try {
      const result = await taskService.getTaskById(Number(id));
      return res.status(HttpStatusCode.OK).send(result);
    } catch (e) {
      next(e);
    }
  };

  updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    const payload: UpdateTaskDto = req.body;

    try {
      const result = await taskService.updateTask(Number(id), payload);
      return res.status(HttpStatusCode.OK).send(result);
    } catch (e) {
      next(e);
    }
  };

  updateTaskStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;
    const { status }: UpdateTaskStatusDto = req.body;

    try {
      const result = await taskService.updateTaskStatus(Number(id), status);
      return res.status(HttpStatusCode.OK).send(result);
    } catch (e) {
      next(e);
    }
  };

  deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { id } = req.params;

    try {
      await taskService.deleteTask(Number(id));
      return res.status(HttpStatusCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  };
}

const taskController = new TaskController();

export default taskController;
