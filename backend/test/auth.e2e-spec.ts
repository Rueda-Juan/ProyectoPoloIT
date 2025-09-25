import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

interface AuthRegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface AuthLoginResponse {
  message: string;
  token: string;
}

interface TestUser {
  name: string;
  email: string;
  password: string;
}

const testUser: TestUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: '123456',
};

describe('Auth Module (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      const body = response.body as AuthRegisterResponse;
      expect(body.message).toBe('User registered successfully');
      expect(body.user).toHaveProperty('id');
      expect(body.user.name).toBe(testUser.name);
      expect(body.user.email).toBe(testUser.email);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login with correct credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);

      const body = response.body as AuthLoginResponse;
      expect(body.message).toBe('Login successful');
      expect(typeof body.token).toBe('string');
    });

    it('should fail login with wrong password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testUser.email, password: 'wrongpass' })
        .expect(401);
    });

    it('should fail login with non-existent email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nonexistent@example.com', password: '123456' })
        .expect(401);
    });
  });
});
