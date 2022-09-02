import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { typeormConfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TodoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
