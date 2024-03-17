// import { IResponse } from "@/common/types";
// import Context from "@/utils/graphql/Context";
// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from "@nestjs/common";
// import { Observable, map } from "rxjs";

// @Injectable()
// export class ResponseInterceptor<T>
//   implements NestInterceptor<T, IResponse<T>>
// {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const ctx = Context.get(context);
//     const headers = Context.getHeaders(context);
//     // console.log(ctx);

//     return next.handle().pipe(
//       map((data) => {
//         // console.log(ctx.res);

//         return { username: "sdsd" };
//       }),
//     );
//   }
// }
