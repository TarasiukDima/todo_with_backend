import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './modules/user/quards/jwt-auth.guard';
import { PORT, UNCAUGHT_ERROR, UNHANDLED_ERROR } from './settings';
import { getErrorMessage } from './utils';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    const reflector = app.get(Reflector);
    app
      .useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
      .useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
      )
      .useGlobalGuards(new JwtAuthGuard(reflector));

    const config = new DocumentBuilder()
      .setTitle('Todo')
      .setDescription('The todo API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT Token',
          in: 'header',
        },
        'JWT-AUTHORIZATION',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('doc', app, document, {
      swaggerOptions: {
        port: PORT,
      },
    });

    await app.listen(PORT);
  } catch (error) {
    console.log('Error', error);
  }
};

bootstrap();

process.on('uncaughtException', (error: Error) => {
  const message = getErrorMessage(UNCAUGHT_ERROR, error);
  console.log(message);
});

process.on('unhandledRejection', (error: Error) => {
  const message = getErrorMessage(UNHANDLED_ERROR, error);
  console.log(message);
});
