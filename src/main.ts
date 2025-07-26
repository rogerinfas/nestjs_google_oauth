import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Google OAuth API')
    .setDescription('API con autenticación local y Google OAuth2')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('users', 'Endpoints de usuarios')
    .addTag('tasks', 'Endpoints de tareas')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API Documentation',
  });

  // Configurar CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicación ejecutándose en: ${await app.getUrl()}`);
  console.log(`Documentación disponible en: ${await app.getUrl()}/api/docs`);
}
bootstrap();
