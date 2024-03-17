// import { User } from "@/user";
import {
  Args,
  Context,
  GqlContextType,
  Mutation,
  Resolver,
} from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse, ForgotResponse } from "@/user";
import {
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { IsEmail, Length } from "class-validator";
import { AuthorizeInput, ForgotPasswordInput } from "@/user/user.schema";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthResponse, {
    nullable: false,
  })
  async authorize(
    @Args({ name: "input", type: () => AuthorizeInput })
    input: AuthorizeInput,
    @Context() context: any,
  ) {
    const result = await this.authService.authorize(
      input.username,
      input.password,
    );

    if (result) {
      context.res.cookie("refreshToken", result.refreshToken, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Set to 'none' in production
      });
      return result;
    }

    return new UnauthorizedException("Username and password is incorrect");
  }

  @Mutation(() => ForgotResponse, {
    name: "forgot_password",
    nullable: true,
  })
  async forgotPassword(
    @Args({ name: "input", type: () => ForgotPasswordInput })
    input: ForgotPasswordInput,
    @Context() context: any,
  ) {
    const result = await this.authService.reset(input.email!);
    if (result) return result;
    console.log(result);

    return new InternalServerErrorException(
      "An error occurred while trying to reset your password. Please try again later.",
    );
  }
}
