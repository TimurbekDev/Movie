import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function startApp() {
  const app = await NestFactory.create(AppModule);


  // USE SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Movie')
    .setDescription('The Movie API description')
    .setVersion('1.0')
    .addTag('Movie')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  // USE CONFIG SERVICE
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('app.port'), () =>
    console.log(
      `server is running on port: ${configService.get<number>('app.port')}`,
    ),
  );
}
startApp();
