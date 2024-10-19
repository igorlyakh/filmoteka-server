import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User as UserType } from '@prisma/client';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserType => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
