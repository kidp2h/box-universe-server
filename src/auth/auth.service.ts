import { MailService } from "@/common/shared/mail/mail.service";
import { AuthResponse, UserService } from "@/user";
import { InjectRedis } from "@nestjs-modules/ioredis";
import { UserPayload } from "@/user/user.schema";
import { random } from "@/utils";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import _ from "lodash";
import { Redis } from "ioredis";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { resolve } from "path";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async authorize(
    username: string,
    password: string,
  ): Promise<(AuthResponse & { refreshToken: string }) | null> {
    const user = await this.userService.findFirst({
      username,
    });

    if (user) {
      const isCorrect = await bcrypt.compare(password, user.password);

      if (isCorrect) {
        const payload: UserPayload = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });
        return {
          refreshToken,
          accessToken: this.jwtService.sign(payload),
          user,
        };
      }
      return null;
    }
    return null;
  }

  async reset(email: string): Promise<any | null> {
    const user = await this.userService.findFirst({
      email,
    });
    if (user) {
      const code = random(100000, 900000);
      const [_, result] = await Promise.all([
        this.redis.set(email, code, "EX", 60 * 30),
        this.mailService.sendTemplate(
          email,
          {
            subject: "Password Reset",
          },
          {
            path: resolve(
              __dirname,
              "..",
              "common",
              "shared",
              "mail",
              "templates",
              "./reset-password.ejs",
            ),
            variables: {
              code,
              username: user.username,
            },
          },
        ),
      ]);
      // console.log(result);

      // const result = null;
      // const [redisResult, result] = await Promise.all([
      //   await this.redis.set(email, code, "EX", 60 * 30),
      //   await this.mailService.sendTemplate(
      //     email,
      //     {
      //       subject: "Password Reset",
      //     },
      //     {
      //       path: resolve(
      //         __dirname,
      //         "..",
      //         "common",
      //         "shared",
      //         "mail",
      //         "templates",
      //         "./reset-password.ejs",
      //       ),
      //       variables: {
      //         code,
      //         username: user.username,
      //       },
      //     },
      //   ),
      // ]);
      // console.log(redisResult);

      if (result) return { success: true, email: user.email };
    }
    return null;
  }
}
