import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  PaymentDeclinedError,
  InvalidTransitionError,
} from '../orders/order.errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (
        typeof errorResponse === 'object' &&
        errorResponse !== null &&
        'message' in errorResponse
      ) {
        const errorMessage = errorResponse.message;

        if (
          typeof errorMessage === 'string' ||
          (Array.isArray(errorMessage) &&
            errorMessage.every((item) => typeof item === 'string'))
        ) {
          message = errorMessage;
        }
      }
    } else if (exception instanceof PaymentDeclinedError) {
      status = HttpStatus.PAYMENT_REQUIRED;
      message = 'Payment declined';
    } else if (exception instanceof InvalidTransitionError) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    }

    if (status >= 500) {
      this.logger.error(
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const requestId = request.headers['x-request-id'];

    response.status(status).json({
      statusCode: status,
      message,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
      requestId: Array.isArray(requestId) ? requestId[0] : (requestId ?? null),
    });
  }
}
