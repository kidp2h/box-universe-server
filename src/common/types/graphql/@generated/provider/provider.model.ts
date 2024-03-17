import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Provider {

    @Field(() => String, {nullable:true})
    id!: string | null;

    @Field(() => String, {nullable:false,defaultValue:'local'})
    type!: string;
}
