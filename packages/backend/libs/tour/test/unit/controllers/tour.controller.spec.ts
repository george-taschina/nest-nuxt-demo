import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { TourController } from '@has-george-read-backend/tour/controllers/tour.controller';
import { TourService } from '@has-george-read-backend/tour/services/tour.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as TE from 'fp-ts/TaskEither';
import { createFixtureAvailableTourResponse } from '../../fixtures/fixture-tour';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { BadRequestException } from '@nestjs/common';

describe('TourController', () => {
  let testingModule: TestingModule;
  let tourController: TourController;
  let tourService: DeepMocked<TourService>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [TourController],
    })
      .useMocker(() => createMock())
      .compile();

    tourController = await testingModule.get(TourController);
    tourService = await testingModule.get(TourService);
  });

  afterAll(async () => await testingModule.close());

  beforeEach(() => jest.clearAllMocks());

  describe('getAvailableTours', () => {
    it('should return tours', async () => {
      const validTour = createFixtureAvailableTourResponse();
      tourService.getAvailableTours.mockReturnValueOnce(TE.right([validTour]));

      const result = await tourController.getAvailableTours();

      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(validTour);
    });

    it('should return BadRequest if databaseError', async () => {
      const databaseError = new DatabaseError('Error getting tours');
      tourService.getAvailableTours.mockReturnValueOnce(TE.left(databaseError));

      await expect(
        async () => await tourController.getAvailableTours()
      ).rejects.toThrow(
        new BadRequestException(
          {
            statusCode: 400,
            message: ['message'],
            error: 'Bad Request',
          },
          { cause: databaseError }
        )
      );
    });
  });
});
