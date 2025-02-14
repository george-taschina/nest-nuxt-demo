import { ApiResponseSchemaHost } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export const TOUR_GET_RESPONSE_SCHEMA: ApiResponseSchemaHost['schema'] = {
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    startingDate: { type: 'string', format: 'date-time' },
    endingDate: { type: 'string', format: 'date-time' },
    price: { type: 'number' },
    totalSeats: { type: 'number' },
    moods: {
      type: 'object',
      properties: {
        nature: { type: 'number' },
        relax: { type: 'number' },
        history: { type: 'number' },
        culture: { type: 'number' },
        party: { type: 'number' },
      },
    },
    availableSeats: { type: 'number' },
  },
};

export class GetTourResponseDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  @IsDate()
  startingDate!: Date;

  @IsNotEmpty()
  @IsDate()
  endingDate!: Date;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  totalSeats!: number;

  @IsNotEmpty()
  moods!: {
    nature: number;
    relax: number;
    history: number;
    culture: number;
    party: number;
  };

  @IsNotEmpty()
  @IsNumber()
  availableSeats!: number;
}
