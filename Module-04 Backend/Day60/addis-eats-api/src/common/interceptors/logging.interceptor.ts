import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, path } = request;
    const handler = context.getHandler().name;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.info(
            {
              method,
              url: path,
              handler,
              durationMs: Date.now() - startTime,
              outcome: 'success',
            },
            'Request completed',
          );
        },
        error: (error: unknown) => {
          const statusCode =
            error instanceof HttpException ? error.getStatus() : 500;

          const logData = {
            method,
            url: path,
            handler,
            statusCode,
            durationMs: Date.now() - startTime,
          };

          if (statusCode >= 500) {
            this.logger.error(logData, 'Request failed');
          } else {
            this.logger.warn(logData, 'Request rejected');
          }
        },
      }),
    );
  }
}
