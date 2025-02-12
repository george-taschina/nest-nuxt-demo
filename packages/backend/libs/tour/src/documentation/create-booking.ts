import { ApiResponseSchemaHost } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export const BOOKING_CREATE_REQUEST_SCHEMA: ApiResponseSchemaHost['schema'] = {
  properties: {
    reservationId: {
      type: 'string',
    },
  },
};

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  reservationId!: string;
}
