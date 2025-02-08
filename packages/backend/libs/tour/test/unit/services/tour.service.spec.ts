import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { TourService } from '@has-george-read-backend/tour/services/tour.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as TE from 'fp-ts/TaskEither';
import { createFixtureTour } from '../../fixtures/fixture-tour';
import { DatabaseError } from '@has-george-read-backend/core/types/errors';
import { TourRepository } from '@has-george-read-backend/tour/repositories/tour.repository';

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

  describe('search', () => {
    it('should return tours', async () => {
      const validTour = createFixtureTour();
      tourRepository.search.mockReturnValueOnce(TE.right([validTour]));

      const result = await tourService.search()();

      expect(result).toEqualRight([validTour]);
    });

    it('should return databaseError if repository returns databaseError', async () => {
      const databaseError = new DatabaseError('Error getting tours');
      tourRepository.search.mockReturnValueOnce(TE.left(databaseError));

      const result = await tourService.search()();

      expect(result).toEqualLeft(databaseError);
    });
  });
});
