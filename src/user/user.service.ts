import { Injectable } from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";
import { UserRepository } from "./user.repository";
// import { User } from "./user.schema";
import BaseService from "@/common/base.service";
import { User } from "@/common/types/graphql/@generated/user/user.model";
@Injectable()
export class UserService extends BaseService<User> {
  constructor(private readonly userRepository: UserRepository) {
    super();
    this._repository = userRepository;
  }
}
