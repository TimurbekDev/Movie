import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function startApp() {
  const app = await NestFactory.create(AppModule);


  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('app.port'),()=>console.log(`server is running on port: ${configService.get<number>('app.port')}`));
}
startApp();
