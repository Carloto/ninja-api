import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NinjasModule,
    MongooseModule.forRoot('mongodb://192.168.15.171:27017/ninja-api'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
