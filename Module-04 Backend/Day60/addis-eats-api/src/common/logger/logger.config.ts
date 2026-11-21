import { IncomingMessage } from 'node:http';

export const loggerConfig = {
  pinoHttp: {
    level: process.env.LOG_LEVEL ?? 'info',

    genReqId: (req: IncomingMessage) => req.headers['x-request-id'] as string,

    redact: {
      paths: [
        'req.headers.authorization',
        "req.headers['x-api-key']",
        'req.body.password',
        'req.body.telebirrPhone',
        '*.phone',
      ],
      censor: '[redacted]',
    },

    transport:
      process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty' }
        : undefined,
  },
};
