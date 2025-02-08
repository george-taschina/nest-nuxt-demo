import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TourModule } from '@has-george-read-backend/tour/tour.module';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TourModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET tours`, () => {
    return request(app.getHttpServer())
      .get('/tours')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeArray();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
