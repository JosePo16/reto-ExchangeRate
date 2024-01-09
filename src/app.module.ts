import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './modules/auth/auth.module';
import { ExchangeRateModule } from './modules/exchange-rate/exchange-rate.module';
import { LoggerModule } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './middlewares/correlation-id.middleware';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            messageKey: 'message',
          },
        },
        messageKey: 'message',
      },
    }),
    AuthModule,
    ExchangeRateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
