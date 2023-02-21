import { prisma } from "./dbInit";

export const testController = () => {
  return {
    clearAllTask: async () => {
      const deleted = await prisma.task.deleteMany({});
      console.log("deleted");

      return deleted;
    },
  };
};
