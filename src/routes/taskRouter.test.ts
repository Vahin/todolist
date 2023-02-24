import request from "supertest";
import { app, taskRoute } from "../app";
import { DatabaseMock } from "./../utils/databaseMock";
import { HTTP_STATUS } from "./../utils/httpStatus";
import { prisma } from "../controllers/dbInit";

let database = new DatabaseMock();

describe("Task Router:", () => {
  beforeAll(async () => {
    database = await database.init(prisma.task);

    await database.clear();
  });

  beforeEach(async () => {
    await database.clear();
  });

  afterAll(async () => {
    await database.restore();
  });

  describe("Create:", () => {
    it("Shouldn't create a new task with incorrect data and returns message", async () => {
      const res = await request(app).post(taskRoute).send({});

      expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST_400);
      expect(res.body).toEqual({
        message: expect.any(String),
      });

      const check = await prisma.task.findMany();

      expect(check.length).toBe(0);
    });

    it("Should create a new task and returns it", async () => {
      const content = "New task created";
      const res = await request(app).post(taskRoute).send({ content });

      expect(res.status).toBe(HTTP_STATUS.CREATED_201);
      expect(res.body).toEqual({
        id: expect.any(Number),
        content,
        completed: false,
        createdAt: expect.any(String),
      });
    });
  });

  describe("Read:", () => {
    it("Should return empty array", async () => {
      await request(app).get(taskRoute).expect(200, []);
    });

    it("Shouldn't get not existing task with incorrect id and return status code 400", async () => {
      const content = "New task created";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app).get(taskRoute + "/incorrect");

      expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST_400);
      expect(res.body).toEqual({ message: expect.any(String) });
    });

    it("Shouldn't get not existing task with correct id and return status code 404", async () => {
      const content = "New task created";
      const task = await prisma.task.create({
        data: {
          content,
        },
      });

      const res = await request(app).get(taskRoute + "/-1");

      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND_404);
      expect(res.body).toEqual({ message: expect.any(String) });
    });

    it("Should get existing task with correct id", async () => {
      const content = "New task created";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app).get(taskRoute + `/${task.id}`);

      expect(res.body).toEqual({
        id: task.id,
        content: task.content,
        completed: task.completed,
        createdAt: expect.any(String),
      });
    });
  });

  describe("Update:", () => {
    it("Shouldn't update not existing task with incorrect id and returns status code 400", async () => {
      const content = "New task created";
      const updatedContent = "Updated content";

      const task = await prisma.task.create({ data: { content } });

      const res = await request(app)
        .put(taskRoute + "/incorrect")
        .send({ content: updatedContent, completed: true });

      expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST_400);
      expect(res.body).toEqual({ message: expect.any(String) });

      const check = await prisma.task.findMany();

      expect(check.length).toBe(1);
      expect(check[0]).toEqual({ ...task });
    });

    it("Shouldn't update not existing task with incorrect body and returns status code 400", async () => {
      const content = "New task created";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app)
        .put(taskRoute + `/${task.id}`)
        .send({ content: "" });

      expect(res.status).toBe(HTTP_STATUS.BAD_REQUEST_400);
      expect(res.body).toEqual({ message: expect.any(String) });

      const check = await prisma.task.findMany();

      expect(check.length).toBe(1);
      expect(check[0]).toEqual({ ...task });
    });

    it("Shouldn't update not existing task with correct id and returns status code 404", async () => {
      const content = "New task created";
      const updatedContent = "Updated content";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app)
        .put(taskRoute + `/-1`)
        .send({ content: updatedContent, completed: true });

      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND_404);
      expect(res.body).toEqual({ message: expect.any(String) });

      const check = await prisma.task.findMany();

      expect(check.length).toBe(1);
      expect(check[0]).toEqual({ ...task });
    });

    it("Should update existing task with correct id", async () => {
      const content = "New task created";
      const updatedContent = "Updated content";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app)
        .put(taskRoute + `/${task.id}`)
        .send({ content: updatedContent, completed: true });

      expect(res.status).toBe(HTTP_STATUS.OK_200);
      expect(res.body).toEqual({
        id: task.id,
        content: updatedContent,
        completed: true,
        createdAt: expect.any(String),
      });
    });
  });

  describe("Delete:", () => {
    it("Shouldn't delete not existing task with string id in request", async () => {
      const content = "Create a new task";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app).delete(taskRoute + "/string");

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: expect.any(String) });

      const taskDB = await prisma.task.findMany();

      expect(taskDB.length).toBe(1);
      expect(taskDB[0]).toEqual({ ...task });
    });

    it("Shouldn't delete not existing task with incorrect id in request", async () => {
      const content = "Create a new task";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app).delete(taskRoute + "/1");

      expect(res.status).toBe(HTTP_STATUS.NOT_FOUND_404);
      expect(res.body).toEqual({ message: expect.any(String) });

      const taskDB = await prisma.task.findMany();

      expect(taskDB.length).toBe(1);
      expect(taskDB[0]).toEqual({ ...task });
    });

    it("Should delete existing task with correct id in request", async () => {
      const content = "Create a new task";
      const task = await prisma.task.create({ data: { content } });

      const res = await request(app).delete(taskRoute + `/${task.id}`);

      expect(res.status).toBe(HTTP_STATUS.NO_CONTENT_204);

      const taskDB = await prisma.task.findMany();

      expect(taskDB.length).toBe(0);
    });
  });
});
