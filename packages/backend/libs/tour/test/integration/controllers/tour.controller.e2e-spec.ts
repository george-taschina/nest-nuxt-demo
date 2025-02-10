import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TourModule } from '@has-george-read-backend/tour/tour.module';

describe('Tour', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TourModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe(`/GET tours`, () => {
    it('should return 200 and be an array of 2 values', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tours')
        .expect(200);
      expect(body).toBeArray();
      expect(body).toBeArrayOfSize(2);
    });
  });

  describe(`/POST reservations`, () => {
    it('should return 201 contain id, seatsReserved and expiresAt', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/reservations')
        .send({
          tourId: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
          email: 'test@email.com',
          numberOfSeats: 1,
        })
        .expect(201);
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('seatsReserved');
      expect(body).toHaveProperty('expiresAt');
    });

    it('should return 400 because all seats have been reserved or booked', async () => {
      await request(app.getHttpServer())
        .post('/reservations')
        .send({
          tourId: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
          email: 'test@email.com',
          numberOfSeats: 1,
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
