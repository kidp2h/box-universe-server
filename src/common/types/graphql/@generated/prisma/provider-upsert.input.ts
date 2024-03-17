import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProviderCreateInput } from '../provider/provider-create.input';
import { Type } from 'class-transformer';
import { ProviderUpdateInput } from '../provider/provider-update.input';

@InputType()
export class ProviderUpsertInput {

    @Field(() => ProviderCreateInput, {nullable:false})
    @Type(() => ProviderCreateInput)
    set!: ProviderCreateInput;

    @Field(() => ProviderUpdateInput, {nullable:false})
    @Type(() => ProviderUpdateInput)
    update!: ProviderUpdateInput;
}
