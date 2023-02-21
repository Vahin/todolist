import { prisma } from "./dbInit";

type UpdateTaskType = {
  id: number;
  content: string;
  completed: boolean;
};

export const taskController = () => {
  const select = {
    id: true,
    content: true,
    createdAt: true,
    completed: true,
  };

  return {
    /**
     *  Returns an object with keys like the TaskViewModel type, but with values in Boolean type
     */
    select,

    /**
     * Get all tasks
     */
    getAllTasks: async () => {
      const tasks = await prisma.task.findMany({
        select,
      });

      return tasks;
    },

    /**
     * Get task by id
     */
    getTaskById: async ({ id }: { id: number }) => {
      const task = await prisma.task.findUnique({
        where: {
          id,
        },
        select,
      });

      return task;
    },

    /**
     * Create a new task and returns object with type TaskViewModel or null
     */
    createNewTask: async ({ content }: { content: string }) => {
      return await prisma.task.create({
        data: {
          content,
        },
        select,
      });
    },

    /**
     * Finds a task by id and updates it. Returns object with type TaskViewModel or null
     */
    updateTask: async ({ id, content, completed }: UpdateTaskType) => {
      try {
        const task = await prisma.task.update({
          where: {
            id,
          },
          data: {
            content,
            completed,
          },
          select,
        });

        return task;
      } catch (err) {
        return null;
      }
    },

    deleteTask: async ({ id }: { id: number }) => {
      try {
        const task = await prisma.task.delete({
          where: {
            id,
          },
          select,
        });

        return task;
      } catch (err) {
        return null;
      }
    },
  };
};
