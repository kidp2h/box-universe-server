import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserConnection } from "./user.schema";
import { UserService } from "./user.service";
import { BaseResolver } from "../common/base.resolver";
import {
  UserCreateInput,
  User,
  UserUpdateInput,
} from "@/common/types/graphql/@generated/user";
import { ParseHashPassword } from "@/common/pipes/ParseHashPassword";
import * as bcrypt from "bcrypt";

@Resolver(() => User)
export class UserResolver extends BaseResolver(User, UserConnection) {
  constructor(private readonly usersService: UserService) {
    super();
    this._service = usersService;
  }

  @Mutation(() => User, {
    nullable: true,
    name: "register",
  })
  async create(
    @Args("userCreateInput", new ParseHashPassword())
    userCreateDto: UserCreateInput,
  ): Promise<User> {
    return this.usersService.create({
      ...userCreateDto,
      provider: {
        type: "local",
      },
    } as User);
  }

  @Mutation(() => User, {
    nullable: false,
    name: "updateUser",
  })
  update(
    @Args({ name: "id", type: () => ID }) id: string,
    @Args(
      { name: "userUpdateInput", type: () => UserUpdateInput },
      new ParseHashPassword(),
    )
    userUpdateInput: UserUpdateInput,
  ) {
    return this.usersService.update<UserUpdateInput>(id, userUpdateInput);
  }
}
