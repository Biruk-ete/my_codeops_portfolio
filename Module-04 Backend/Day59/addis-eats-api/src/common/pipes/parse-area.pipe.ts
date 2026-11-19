import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AREAS, Area } from '../../restaurants/restaurant.types';

@Injectable()
export class ParseAreaPipe implements PipeTransform {
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Area | undefined {
    if (value === undefined) {
      return undefined;
    }

    const normalizedArea = AREAS.find(
      (area) => area.toLowerCase() === value.toLowerCase(),
    );

    if (!normalizedArea) {
      throw new BadRequestException(`Invalid area: ${value}`);
    }

    return normalizedArea;
  }
}
