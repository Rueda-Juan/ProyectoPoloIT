import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`🚀 App running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error('❌ Failed to start application', err);
  process.exit(1); // sale con error
});
