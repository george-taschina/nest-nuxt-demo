import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { TourService } from '@nest-nuxt-demo-backend/tour/services/tour.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as TE from 'fp-ts/TaskEither';
import {
  createFixtureAvailableTourResponse,
  createFixtureTour,
} from '../../fixtures/fixture-tour';
import { DatabaseError } from '@nest-nuxt-demo-backend/core/types/errors';
import { TourRepository } from '@nest-nuxt-demo-backend/tour/repositories/tour.repository';

describe('TourService', () => {
  let testingModule: TestingModule;
  let tourRepository: DeepMocked<TourRepository>;
  let tourService: TourService;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [TourService],
    })
      .useMocker(() => createMock())
      .compile();

    tourRepository = await testingModule.get(TourRepository);
    tourService = await testingModule.get(TourService);
  });

  afterAll(async () => await testingModule.close());

  beforeEach(() => jest.clearAllMocks());

  describe('getAvailableTours', () => {
    it('should return tours', async () => {
      const validTour = createFixtureTour();
      const validReponse = createFixtureAvailableTourResponse();

      tourRepository.getAvailableTours.mockReturnValueOnce(
        TE.right([validTour])
      );

      const result = await tourService.getAvailableTours()();

      expect(result).toEqualRight([validReponse]);
    });

    it('should return databaseError if repository returns databaseError', async () => {
      const databaseError = new DatabaseError('Error getting tours');
      tourRepository.getAvailableTours.mockReturnValueOnce(
        TE.left(databaseError)
      );

      const result = await tourService.getAvailableTours()();

      expect(result).toEqualLeft(databaseError);
    });
  });
});
