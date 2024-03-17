import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        {
          emit: "stdout",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    });
    // this.$on("query", (e) => this.logger.debug(`${e.query} ${e.params}`));
    this.$extends({
      query: {
        user: {
          $allOperations: ({ query, args }) => {
            // console.log("PrismaService extensions");
            return query(args);
          },
        },
      },
    });
  }
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    // this.extensions(this);
    this.$connect();
    // this.extensions(this);
  }
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  extensions(prismaClient: PrismaClient) {}
}
