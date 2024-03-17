// import { IResponse } from "@/common/types";
// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from "@nestjs/common";
// import { GqlExecutionContext } from "@nestjs/graphql";
// import { Observable, map } from "rxjs";

// @Injectable()
// export class ResponseInterceptor<T>
//   implements NestInterceptor<T, IResponse<T>>
// {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const gqlContext = GqlExecutionContext.create(context);
//     const res: Response = gqlContext.getContext().res;
//     console.table(gqlContext);

//     return next.handle().pipe(
//       map((data) => ({
//         status: res.status,
//         message: data.message,
//         data: { ...data.result, accessToken: "EAA" },
//       })),
//     );
//   }
// }
