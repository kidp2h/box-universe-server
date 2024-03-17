import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { ProviderNullableCreateEnvelopeInput } from '../prisma/provider-nullable-create-envelope.input';

@InputType()
export class UserCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    @Validator.Length(6, 20)
    username!: string;

    @Field(() => String, {nullable:false})
    @Validator.Length(6)
    password!: string;

    @Field(() => String, {nullable:false})
    @Validator.IsEmail()
    email!: string;

    @Field(() => ProviderNullableCreateEnvelopeInput, {nullable:true})
    provider?: ProviderNullableCreateEnvelopeInput;

    @Field(() => Date, {nullable:true})
    deletedAt?: Date | string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
