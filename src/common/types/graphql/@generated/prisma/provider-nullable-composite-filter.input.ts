import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProviderObjectEqualityInput } from './provider-object-equality.input';
import { ProviderWhereInput } from '../provider/provider-where.input';

@InputType()
export class ProviderNullableCompositeFilter {

    @Field(() => ProviderObjectEqualityInput, {nullable:true})
    equals?: ProviderObjectEqualityInput;

    @Field(() => ProviderWhereInput, {nullable:true})
    is?: ProviderWhereInput;

    @Field(() => ProviderWhereInput, {nullable:true})
    isNot?: ProviderWhereInput;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
