import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundError extends NotFoundException {
  constructor(public readonly orderId: number) {
    super(`Order #${orderId} not found`);
    this.name = 'OrderNotFoundError';
  }
}

export class PaymentDeclinedError extends Error {
  constructor(
    public readonly phone: string,
    public readonly reason: string,
  ) {
    super(`TeleBirr declined for ${phone}: ${reason}`);
    this.name = 'PaymentDeclinedError';
    Object.setPrototypeOf(this, PaymentDeclinedError.prototype);
  }
}

export class InvalidTransitionError extends Error {
  constructor(
    public readonly currentStatus: string,
    public readonly requestedStatus: string,
  ) {
    super(
      `Cannot transition order from ${currentStatus} to ${requestedStatus}`,
    );
    this.name = 'InvalidTransitionError';
    Object.setPrototypeOf(this, InvalidTransitionError.prototype);
  }
}
