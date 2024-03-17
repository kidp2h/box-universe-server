export {
  MakeEdge,
  Connection,
  PageInfo,
  PaginationInput,
  BaseConnection,
  BaseEdge,
  BaseEntity,
} from "./graphql/Pagination";
import { Prisma } from "@prisma/client";
import { BaseConnection } from "./graphql/Pagination";

export type Action = {
  [K in Prisma.PrismaAction]: (...args: any[]) => any;
};

export interface IRepository<T> {
  findOne(id: string): Promise<T>;
  findMany(filter: Partial<T>): Promise<T[]>;
  findAll(): Promise<T[]>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
  create(item: Partial<T>): Promise<T>;
}

export interface IService<T> {
  findOne(id: string): Promise<T>;
  findMany(filter: Partial<T>): Promise<T[]>;
  findAll(): Promise<T[]>;
  update(id: string, item: Partial<T>): Promise<T>;
  create(item: Partial<T>): Promise<T>;
  update(id: string, item: T): Promise<T>;
}

export interface IResolver<T> {
  findOne(id: string): Promise<T>;
  findMany(take: number, after: string): Promise<BaseConnection<T>>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
  create(item: Partial<T>): Promise<T>;
}
