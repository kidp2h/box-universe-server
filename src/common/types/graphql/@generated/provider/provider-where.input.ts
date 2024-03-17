import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ProviderWhereInput {

    @Field(() => [ProviderWhereInput], {nullable:true})
    AND?: Array<ProviderWhereInput>;

    @Field(() => [ProviderWhereInput], {nullable:true})
    OR?: Array<ProviderWhereInput>;

    @Field(() => [ProviderWhereInput], {nullable:true})
    NOT?: Array<ProviderWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    id?: StringNullableFilter;

    @Field(() => StringFilter, {nullable:true})
    type?: StringFilter;
}
