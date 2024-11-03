import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { appConfig, databaseConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './modules/categories/entities';
import { CategoriesModule } from './modules/categories/categories.module';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';



import { MoviesModule } from './modules';


@Module({
  imports: [ServeStaticModule.forRoot({
    serveRoot: "/uploads",
    rootPath: "/uploads"
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig,appConfig]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>({
      dialect: 'postgres',
      username: configService.get<string>("database.user"),
      password: configService.get<string>("database.pass"),
      database: configService.get("database.database"),
      port: configService.get<number>("database.port"),
      host: configService.get<string>("database.host"),
      synchronize: true,
      logging: console.log,
      autoLoadModels: true,
      // sync: {force: true},
      models: [Category],

    }),
  }),
  JwtModule.register({
    global: true,
    secret: "my-secret-key",
    signOptions: { expiresIn: 120 },
  }),
  CategoriesModule,
  UsersModule,
  AuthModule,
  CategoriesModule,
  MoviesModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
