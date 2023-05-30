import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from '../model';

const getCurrentUserByContext = (ctx: ExecutionContext): UsersDocument => {
  if (ctx.getType() === 'http') {
    return ctx.switchToHttp().getRequest().user;
  }

  if (ctx.getType() === 'rpc') {
    return ctx.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
