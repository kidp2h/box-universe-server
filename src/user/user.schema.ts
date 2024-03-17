import { Connection, MakeEdge } from "@/common/types";
import { User, UserCreateInput } from "@/common/types/graphql/@generated/user";
import {
  ArgsType,
  Field,
  ID,
  InputType,
  ObjectType,
  PickType,
} from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

/**
 // @ObjectType()
// export class Provider {
//   @Field(() => String, { nullable: true })
//   id: string | null;
//   @Field()
//   type: string;
// }

// @InputType()
// export class ProviderInput {
//   @Field({ nullable: true })
//   // @IsOptional()
//   id?: string;

//   // @IsNotEmpty()
//   @Field({ nullable: false })
//   type: string;
// }

// @ObjectType()
// export class User {
//   @Field(() => ID, { nullable: false })
//   id: string;

//   @Field({ nullable: true })
//   username: string;

//   password: string;

//   @Field({ nullable: false })
//   email: string;

//   @Field(() => [Provider])
//   providers: Provider[];

//   @Field(() => String)
//   deletedAt: Date | null;

//   @Field(() => String)
//   createdAt: Date | null;

//   @Field(() => String)
//   updatedAt: Date | null;
// }
 */

@ObjectType()
export class UserEdge extends MakeEdge(User) {}

@ObjectType()
export class UserConnection extends Connection(User) {}

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class ForgotResponse extends PickType(User, ["email"] as const) {
  @Field(() => Boolean)
  success: boolean;
}
@ObjectType()
export class UserPayload extends PickType(User, [
  "email",
  "username",
  "id",
] as const) {}

@InputType()
@ObjectType()
export class ForgotPasswordInput {
  @IsEmail()
  @Field(() => String)
  email: string;
}

@InputType()
export class AuthorizeInput {
  @Length(6, 20)
  @Field(() => String)
  username: string;

  @Length(6)
  @Field(() => String)
  password: string;
}
