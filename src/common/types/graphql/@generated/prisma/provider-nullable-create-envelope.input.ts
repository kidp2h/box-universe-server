import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProviderCreateInput } from '../provider/provider-create.input';
import { Type } from 'class-transformer';

@InputType()
export class ProviderNullableCreateEnvelopeInput {

    @Field(() => ProviderCreateInput, {nullable:true})
    @Type(() => ProviderCreateInput)
    set?: ProviderCreateInput;
}
