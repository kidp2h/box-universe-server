import { Field, InputType, ObjectType, createUnionType } from "@nestjs/graphql";

export namespace AuthDto {
  @InputType()
  export class SignIn {
    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
  }

  @InputType()
  export class SignUp {
    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;

    @Field(() => String)
    confirmPassword: string;

    @Field(() => String)
    email: string;
  }

  @InputType()
  export class ForgotPassword {
    @Field(() => String)
    email: string;
  }

  @ObjectType()
  class Response {
    @Field(() => String)
    accessToken: string;
  }

  export const ResponseAuth = createUnionType({
    types: () => [SignIn, Response] as const,
  });
}
