import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProviderCreateInput } from '../provider/provider-create.input';
import { Type } from 'class-transformer';
import { ProviderUpsertInput } from './provider-upsert.input';

@InputType()
export class ProviderNullableUpdateEnvelopeInput {

    @Field(() => ProviderCreateInput, {nullable:true})
    @Type(() => ProviderCreateInput)
    set?: ProviderCreateInput;

    @Field(() => ProviderUpsertInput, {nullable:true})
    @Type(() => ProviderUpsertInput)
    upsert?: ProviderUpsertInput;

    @Field(() => Boolean, {nullable:true})
    unset?: boolean;
}
