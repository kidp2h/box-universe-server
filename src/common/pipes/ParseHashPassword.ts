import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import * as bcrypt from "bcrypt";
@Injectable()
export class ParseHashPassword implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, Number(process.env.SALT));
    const hash = await bcrypt.hash(
      value.password,
      Number(process.env.SALT) || 10,
    );
    value.password = hash;
    return value;
  }
}
