import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';




import { Actor, ActorModule, ActorMovieModule, AuthModule, CategoriesModule, Category, Device, DevicesModule, Movie, MovieActor, MoviesModule, Review, ReviewsModule, User, UserModule } from '@modules';
import { appConfig, databaseConfig, jwtConfig, strategyConfig } from '@config';




@Module({
  imports: [ServeStaticModule.forRoot({
    serveRoot: "/uploads",
    rootPath: "/uploads"
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig,appConfig,jwtConfig,strategyConfig]
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
      models: [Category,User,Review,Movie,MovieActor,Actor,Device],

    }),
  }),
  CategoriesModule,
  UserModule,
  AuthModule,
  MoviesModule,
  ReviewsModule,
  ActorModule,
  ActorMovieModule,
  DevicesModule

  
],

  controllers: [],
  providers: [],
})
export class AppModule {}
