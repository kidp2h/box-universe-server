import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import BaseService from "./base.service";
import { Type } from "@nestjs/common";
import { BaseConnection, BaseEntity, IResolver } from "./types";
import { lowerCase } from "lodash";
// import { BaseResolverHost } from "./base.resolver"; // Import the BaseResolverHost class

@Resolver({ isAbstract: true })
export abstract class _<T extends Type<unknown>> {
  protected _service: BaseService<T>;
}

export function BaseResolver<T extends Type<unknown>, TConnection>(
  classRef: T,
  connectionClassRef: TConnection,
): any {
  @Resolver({ isAbstract: true })
  abstract class _BaseResolver<T> implements IResolver<T> {
    protected _service: BaseService<T>;

    @Query((type) => classRef, { name: `${lowerCase(classRef.name)}` })
    findOne(
      @Args({
        name: "id",
        type: () => ID,
      })
      id: string,
    ): Promise<T> {
      console.log(id);

      return this._service.findOne(id);
    }

    @Query((type) => connectionClassRef, {
      name: `${lowerCase(classRef.name)}s`,
    })
    async findMany(
      @Args("take") take: number,
      @Args("after", { nullable: true }) after: string,
    ): Promise<BaseConnection<T>> {
      // const entities = (await this._service.findPagination(
      //   first + 1,
      //   after,
      // )) as unknown as BaseEntity[];

      const [count, entities] = await Promise.all([
        this._service.count(),
        this._service.findPagination(
          take + 1,
          after,
        ) as unknown as BaseEntity[],
      ]);

      const edges = entities.map((entity) => ({
        node: entity,
        cursor: entity.id, // Assuming `id` can be used as a cursor
      }));

      const endCursor =
        entities.length > 0 ? entities[entities.length - 1].id : null;
      const hasNextPage = entities.length > take;
      const totalPages = Math.ceil(count / take);
      if (hasNextPage) edges.pop();

      return {
        edges,
        pageInfo: {
          endCursor,
          hasNextPage,
          totalPages,
        },
      };
    }

    @Mutation((type) => [classRef], { name: `delete${classRef.name}` })
    delete(@Args("id") id: string) {
      return this._service.delete(id);
    }

    // @Mutation((type) => [classRef], { name: `update${classRef.name}` })
    // update(id: string, item: Partial<T>) {
    //   return this._service.update(id, item);
    // }

    // @Mutation((type) => [classRef], { name: `create${classRef.name}` })
    // create(item: T): Promise<T> {
    //   return this._service.create(item);
    // }

    abstract create<TInput>(item: TInput): Promise<T>;
    abstract update<TInput>(id: string, item: TInput): Promise<T>;
  }
  return _BaseResolver;
}
