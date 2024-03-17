import { Action, IRepository } from "./types";
export default abstract class BaseRepository<T> implements IRepository<T> {
  protected _model: Action;

  findOne(id: string): Promise<T> {
    return this._model.findUnique({
      where: {
        id,
      },
    });
  }
  findFirst(filter: Partial<T>): Promise<T> {
    return this._model.findFirst({
      where: {
        ...filter,
      },
    });
  }
  findPagination(first: number, after: string | null): Promise<T[]> {
    return this._model.findMany({
      where: {
        id: {
          gt: after,
        },
      },
      orderBy: {
        id: "asc",
      },
      take: first,
    });
  }

  findMany<TInput>(filter: TInput): Promise<T[]> {
    return this._model.findMany({
      where: {
        ...filter,
      },
    });
  }

  findAll(): Promise<T[]> {
    return this._model.findMany({
      where: {},
    });
  }

  update<TInput>(id: string, item: TInput) {
    return this._model.update({
      where: {
        id,
      },
      data: {
        ...item,
        updatedAt: new Date(),
      },
    });
  }

  delete(id: string) {
    return this._model.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  create(item: Partial<T>): Promise<T> {
    return this._model.create({
      data: {
        ...item,
      },
    });
  }
  async count(): Promise<number> {
    return this._model.count();
  }
}
