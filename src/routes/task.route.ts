import { Router } from "express";

import taskController from "../controllers/task.controller";

import { CreateTaskDto } from "../dto/create-task.dto";
import { validateQuery } from "../middleware/request-query-validator.middleware";
import { validateBody } from "../middleware/request-body-validator.middleware";
import { GetTaskFilterDto } from "../dto/get-task-filter.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { UpdateTaskStatusDto } from "../dto/update-task-status.dto";

const router = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *           description: Filter tasks by status
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           description: Search tasks by title
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *           description: Search tasks by id
 *
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/tasks", validateQuery(GetTaskFilterDto), taskController.getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDto'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/tasks", validateBody(CreateTaskDto), taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get("/tasks/:id", taskController.getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskDto'
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put(
  "/tasks/:id",
  validateBody(UpdateTaskDto),
  taskController.updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task's status
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskStatusDto'
 *     responses:
 *       200:
 *         description: Task status updated successfully
 */
router.patch(
  "/tasks/:id",
  validateBody(UpdateTaskStatusDto),
  taskController.updateTaskStatus
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
