import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./common/prisma/prisma.service";
import { UserModule } from "./user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { RedisModule } from "@nestjs-modules/ioredis";
import { BullModule } from "@nestjs/bull";
@Module({
  imports: [
    RedisModule.forRoot({
      type: "single",
      url: "redis://box-universe-redis:6379",
    }),
    BullModule.forRoot({
      redis: {
        host: "box-universe-redis",
        port: 6379,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.graphql"),
      playground: process.env.NODE_ENV === "development",
      csrfPrevention: false,
      installSubscriptionHandlers: true,
      sortSchema: true,
      cache: "bounded",
      formatError: (error: any) => {
        const originalError = error.extensions?.originalError;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
            success: false,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
          success: false,
        };
      },
      context: ({ req, res }: any) => ({
        req,
        res,
      }),
      // subscriptions: {
      //   "graphql-ws": {
      //     path: "/graphql",

      //     onConnect: (ctx) => {
      //       return {bheaders: ctx.connectionParams};
      //     },
      //   },
      //   // 'subscriptions-transport-ws': {
      //   //   path: '/graphql',
      //   //   onConnect: (headers) => {
      //   //     return { req: { headers: headers } };
      //   //   },
      //   // },
      // },
    }),
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
