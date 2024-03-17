import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
// import { UserCreateDto } from "./dto/UserCreateDto";
// import { User } from "./user.schema";
import BaseRepository from "@/common/base.repository";
import { User } from "@/common/types/graphql/@generated/user/user.model";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(private prisma: PrismaService) {
    super();
    this._model = this.prisma.user as any;
  }
}
