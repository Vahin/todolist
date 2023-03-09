import { UpdateTaskModel } from "./../../../src/Models/tasks/UpdateTaskModel";
import { CreateTaskModel } from "./../../../src/Models/tasks/CreateTaskModel";
import { DeleteTaskModel } from "./../../../src/Models/tasks/DeleteTaskModel";
const baseUrl = "http://localhost:3001/api/";

type UpdateTaskModelClient = UpdateTaskModel & {
  id: number;
};

const tasksApiCreator = () => {
  const url = baseUrl + "task/";

  return {
    getTasks: async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Что-то пошло не так ...");
        }

        const tasks = await res.json();

        return tasks;
      } catch (err) {
        throw err;
      }
    },

    createTask: async ({ content, createdAt }: CreateTaskModel) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, createdAt }),
        });

        if (!res.ok) {
          throw new Error("Что то пошло не так ...");
        }

        const task = await res.json();

        return task;
      } catch (err) {
        throw err;
      }
    },

    removeTask: async ({ id }: DeleteTaskModel) => {
      try {
        const res = await fetch(url + id, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Что-то пошло не так ...");
        }

        return;
      } catch (err) {
        throw err;
      }
    },

    updateTask: async ({ id, content, completed }: UpdateTaskModelClient) => {
      try {
        const res = await fetch(url + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, completed }),
        });

        if (!res.ok) {
          throw new Error("Что-то пошло не так ...");
        }

        return await res.json();
      } catch (err) {
        throw err;
      }
    },
  };
};

export const tasksApi = tasksApiCreator();
