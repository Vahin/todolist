import { CreateTaskModel } from "./../Models/tasks/CreateTaskModel";
import { HTTP_STATUS } from "./../utils/httpStatus";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "./../Models/RequestModels";
import { TaskViewModel } from "./../Models/tasks/TaskViewModel";
import { taskController } from "../controllers/tasksController";
import { Router, Response } from "express";
import { GetTaskModel } from "../Models/tasks/GetTaskModel";
import { UpdateTaskModel } from "../Models/tasks/UpdateTaskModel";
import { DeleteTaskModel } from "../Models/tasks/DeleteTaskModel";

type TaskViewModelOrError = TaskViewModel | { message: string };

export const getTaskRouter = () => {
  const router = Router();
  const db = taskController();

  /**
   * Get all tasks
   */
  router.get("/", async (req, res: Response<TaskViewModel[]>) => {
    const tasks: TaskViewModel[] = await db.getAllTasks();

    res.json(tasks);
  });

  /**
   * Get a task by id
   */
  router.get(
    "/:id",
    async (
      req: RequestWithParams<GetTaskModel>,
      res: Response<TaskViewModelOrError>
    ) => {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(HTTP_STATUS.BAD_REQUEST_400).json({
          message: "Некорректный запрос: Параметр id должен являться числом",
        });
      }

      const task = await db.getTaskById({ id });

      if (!task) {
        return res.status(HTTP_STATUS.NOT_FOUND_404).json({
          message: "Некорректный запрос: Задачи с таким id не существует",
        });
      }

      res.json(task);
    }
  );

  /**
   * Create a new task
   */
  router.post(
    "/",
    async (
      req: RequestWithBody<CreateTaskModel>,
      res: Response<TaskViewModelOrError>
    ) => {
      const content: string = req.body.content;
      const createdAt: string = req.body.createdAt;

      if (!content) {
        return res.status(HTTP_STATUS.BAD_REQUEST_400).json({
          message: "Некорректный запрос: Отсутствует свойство content",
        });
      }

      const task: TaskViewModel = await db.createNewTask({
        content,
        createdAt,
      });

      res.status(HTTP_STATUS.CREATED_201).json(task);
    }
  );

  /**
   * Finds a task by id and updates it
   */
  router.put(
    "/:id",
    async (
      req: RequestWithParamsAndBody<GetTaskModel, UpdateTaskModel>,
      res: Response<TaskViewModelOrError>
    ) => {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(HTTP_STATUS.BAD_REQUEST_400).json({
          message: "Некорректный запрос: Параметр id должен являться числом",
        });
      }

      const { content, completed } = req.body;

      if (!content || completed === null) {
        return res.status(HTTP_STATUS.BAD_REQUEST_400).json({
          message: "Некорректный запрос: Ошибка в теле запроса",
        });
      }

      const task = await db.updateTask({ id, content, completed });

      if (!task) {
        return res.status(HTTP_STATUS.NOT_FOUND_404).json({
          message: "Некорректный запрос: Задачи с таким id не существует",
        });
      }

      res.json(task);
    }
  );

  /**
   * Finds a task by id and deletes it
   */
  router.delete(
    "/:id",
    async (
      req: RequestWithParams<DeleteTaskModel>,
      res: Response<{ message: string }>
    ) => {
      const id = Number(req.params.id);

      if (!id) {
        return res.status(HTTP_STATUS.BAD_REQUEST_400).json({
          message: "Некорректный запрос: Параметр id должен являться числом",
        });
      }

      const task = await db.deleteTask({ id });

      if (!task) {
        return res.status(HTTP_STATUS.NOT_FOUND_404).json({
          message: "Некорректный запрос: Задачи с таким id не существует",
        });
      }

      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  );

  return router;
};
