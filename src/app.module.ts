import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { Actor, ActorModule, ActorMovieModule, AuthModule, CategoriesModule, Category, Device, DevicesModule, JwtCustomModule, Movie, MovieActor, MoviesModule, Review, ReviewsModule, User, UserModule } from '@modules';
import { appConfig, databaseConfig, jwtConfig, mailerConfig, redisConfig, strategyConfig } from '@config';
import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from '@nestjs-modules/ioredis';
import { SeedsModule } from '@seeds';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerCustomModule } from '@mailer';




@Module({
  imports: [ServeStaticModule.forRoot({
    serveRoot: "/uploads",
    rootPath: "/uploads"
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [databaseConfig, appConfig, jwtConfig, strategyConfig, redisConfig,mailerConfig]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      username: configService.get<string>("database.user"),
      password: configService.get<string>("database.pass"),
      database: configService.get("database.database"),
      port: configService.get<number>("database.port"),
      host: configService.get<string>("database.host"),
      synchronize: true,
      logging: console.log,
      autoLoadModels: true,
      sync: { force: false },
      models: [Category, User, Review, Movie, MovieActor, Actor, Device],
    })
  }),
  RedisModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'single',
      options: {
        host: config.get<string>('redis.host'),
        port: config.get<number>('redis.port')
      }
    })
  }),
  MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: {
        host: config.get<string>('email.host'),
        port: config.get<number>('email.port'),
        auth: {
          user: config.get<string>('email.user'),
          pass: config.get<string>('email.pass')
        }
      }
    })
  }),
    CategoriesModule,
    UserModule,
    AuthModule,
    MoviesModule,
    ReviewsModule,
    ActorModule,
    ActorMovieModule,
    DevicesModule,
    JwtCustomModule,
    SeedsModule,
    RedisModule,
    MailerCustomModule
  ],

  controllers: [],
  providers: [
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD
    },
    {
      useClass: CheckRoleGuard,
      provide: APP_GUARD
    }
  ],
})
export class AppModule { }