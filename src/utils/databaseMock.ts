import { Task, Prisma } from "@prisma/client";

// TODO Изменить название и принцип работы на вызов из второй моковой БД

type ModelType = Prisma.TaskDelegate<undefined> | undefined;
type StoreType = Task[] | undefined;

export class DatabaseMock {
  model: ModelType;
  store: StoreType;

  constructor(model?: ModelType, store?: StoreType) {
    this.model = model;
    this.store = store;
  }

  async init(model: ModelType) {
    const store = model ? await model.findMany() : undefined;

    return new DatabaseMock(model, store);
  }

  async clear() {
    return this.model ? await this.model.deleteMany({}) : null;
  }

  async restore() {
    this.clear();
    if (!this.store) {
      return null;
    }

    for (let i = 0; i < this.store.length; i++) {
      if (this.model) {
        await this.model.create({
          data: {
            ...this.store[i],
          },
        });
      }
    }
    return;
  }
}
