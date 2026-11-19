import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl } = request;
    const handler = context.getHandler().name;
    const requestId = request.headers['x-request-id'];
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;

          console.log(
            `${method} ${originalUrl} ${handler} ${requestId} ${duration}ms success`,
          );
        },
        error: () => {
          const duration = Date.now() - startTime;

          console.log(
            `${method} ${originalUrl} ${handler} ${requestId} ${duration}ms error`,
          );
        },
      }),
    );
  }
}
