import { PrismaModule } from "@/common/prisma/prisma.module";
import { UserRepository } from "@/user/user.repository";
import { UserResolver } from "@/user/user.resolver";
import { UserService } from "@/user/user.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
