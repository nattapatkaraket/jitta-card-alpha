import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['debug'],
  });
  app.enableCors();
  app.setGlobalPrefix(`api/${process.env.API_VERSION}`);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  const options = new DocumentBuilder()
    .setTitle('Medical Cart Api Docs')
    .setVersion(process.env.SWAGGER_VERSION)
    .setBasePath(`/api/${process.env.API_VERSION}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(
    `api/${process.env.API_VERSION}/documents`,
    app,
    document,
  );

  await app.listen(process.env.PORT);
}
bootstrap();
