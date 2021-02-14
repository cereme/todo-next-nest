import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { Todo } from './todo/todo.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Todo])],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
