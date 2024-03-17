import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Provider } from '../provider/provider.model';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @HideField()
    password!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => Provider, {nullable:true})
    provider?: Provider | null;

    @Field(() => Date, {nullable:true})
    deletedAt!: Date | null;

    @Field(() => Date, {nullable:true})
    createdAt!: Date | null;

    @Field(() => Date, {nullable:true})
    updatedAt!: Date | null;
}
