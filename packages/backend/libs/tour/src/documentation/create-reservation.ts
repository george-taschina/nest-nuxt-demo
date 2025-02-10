import { ApiResponseSchemaHost } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export const RESERVATION_CREATE_REQUEST_SCHEMA: ApiResponseSchemaHost['schema'] =
  {
    properties: {
      userEmail: {
        type: 'string',
      },
      tourId: {
        type: 'string',
      },
      numberOfSeats: {
        type: 'number',
      },
    },
  };

export class CreateReservationDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  tourId!: string;

  @IsInt()
  numberOfSeats!: number;
}
