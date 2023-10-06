import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAdmin = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    console.log('from admin ', request.user);
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
