import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

const Context = {
  get: (executionContext: ExecutionContext) => {
    return GqlExecutionContext.create(executionContext).getContext();
  },

  getHeaders: (executionContext: ExecutionContext) => {
    const { req } = Context.get(executionContext);
    const headers = Object.getOwnPropertySymbols(req).find(
      (s) => s.description == "kHeaders",
    ) as any;

    return req[headers];
  },
};

export default Context;
