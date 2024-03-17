import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";

// export namespace UserCreateDto {
//   @InputType()
//   export class Credentials {
//     @Length(6, 20)
//     @Field(() => String)
//     username: string;

//     @Length(8)
//     @Field(() => String)
//     password: string;

//     @IsEmail()
//     @Field(() => String)
//     email: string;
//   }
//   export class OAuth {}
// }
