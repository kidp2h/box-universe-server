import BaseRepository from "./base.repository";
import { BaseConnection, IService } from "./types";

export default abstract class BaseService<T> implements IService<T> {
  protected _repository: BaseRepository<T>;

  findOne(id: string): Promise<T> {
    return this._repository.findOne(id);
  }

  findFirst(filter: Partial<T>): Promise<T> {
    return this._repository.findFirst(filter);
  }
  findMany(filter: Partial<T>): Promise<T[]> {
    return this._repository.findMany(filter);
  }

  findPagination(first: number, after: string | null): Promise<T[]> {
    return this._repository.findPagination(first, after);
  }

  findAll(): Promise<T[]> {
    return this._repository.findAll();
  }

  update<TInput>(id: string, item: TInput) {
    return this._repository.update(id, item);
  }

  delete(id: string) {
    return this._repository.delete(id);
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }
  count() {
    return this._repository.count();
  }
}
