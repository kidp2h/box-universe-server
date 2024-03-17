import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { ProviderNullableUpdateEnvelopeInput } from '../prisma/provider-nullable-update-envelope.input';

@InputType()
export class UserUpdateInput {

    @Field(() => String, {nullable:true})
    @Validator.Length(6, 20)
    username?: string;

    @Field(() => String, {nullable:true})
    @Validator.Length(6)
    password?: string;

    @Field(() => String, {nullable:true})
    @Validator.IsEmail()
    email?: string;

    @Field(() => ProviderNullableUpdateEnvelopeInput, {nullable:true})
    provider?: ProviderNullableUpdateEnvelopeInput;

    @Field(() => Date, {nullable:true})
    deletedAt?: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
