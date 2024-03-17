import { Type } from "@nestjs/common";
import { ObjectType, Field, InputType, ID } from "@nestjs/graphql";

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  first?: number;

  @Field({ nullable: true })
  after?: string;
}

@ObjectType()
export class PageInfo {
  @Field(() => Number, { nullable: false })
  totalPages: number;
  @Field()
  hasNextPage: boolean;

  @Field(() => String, { nullable: true })
  endCursor: string | null;
}

export function MakeEdge<TEntity>(TEntity: Type<TEntity>) {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType {
    @Field(() => TEntity)
    node: TEntity;

    @Field()
    cursor: string;
  }
  return EdgeType;
}

export function Connection<TEntity>(TEntity: Type<TEntity>) {
  // if(Edge)
  @ObjectType({ isAbstract: true })
  class Edge extends MakeEdge(TEntity) {}
  @ObjectType({ isAbstract: true })
  abstract class ConnectionType {
    @Field(() => [Edge])
    edges: Edge[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return ConnectionType;
}

@ObjectType()
export class BaseEntity {
  @Field(() => ID, { nullable: false })
  id: string;

  @Field(() => String)
  createdAt: Date | null;

  @Field(() => String)
  updatedAt: Date | null;
}
@ObjectType()
export class BaseEdge<T> extends MakeEdge(BaseEntity) {}

@ObjectType()
export class BaseConnection<T> extends Connection(BaseEntity) {}
