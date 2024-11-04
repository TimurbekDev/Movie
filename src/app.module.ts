import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { appConfig, databaseConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ActorModule, AuthModule, CategoriesModule, Category, Movie, MoviesModule, Review, ReviewsModule, User, UsersModule } from './modules';





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
      models: [Category,User,Review,Movie],

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
  MoviesModule,
  ReviewsModule,
  ActorModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
