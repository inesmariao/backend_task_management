import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  /**
   * Enable Cross-Origin Resource Sharing (CORS) for the application.
   */
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  /**
   * Configure global validation pipes to handle request validation.
   * - `whitelist`: Automatically strip properties that do not have decorators.
   * - `forbidNonWhitelisted`: Throw an error if non-whitelisted properties are present.
   * - `transform`: Automatically transform payloads to match DTOs.
   * - `exceptionFactory`: Customize error messages for validation errors.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          const constraints = err.constraints
            ? Object.values(err.constraints).join('. ')
            : 'Unknown error';
          return `${err.property}: ${constraints}`;
        });
        return {
          statusCode: 400,
          message: messages,
          error: 'Validation error',
        };
      },
    })
  );

  /**
   * Configure Swagger for API documentation.
   * - `setTitle`: Set the title of the API documentation.
   * - `setDescription`: Provide a description for the API.
   * - `setVersion`: Specify the API version.
   * - `addTag`: Add tags for categorizing API endpoints.
   */
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for managing tasks with CRUD operations.')
    .setVersion('1.0')
    .addTag('tasks', 'Operations related to task management')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
}
bootstrap();
