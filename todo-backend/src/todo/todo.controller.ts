import {
  Controller,
  Get,
  Patch,
  Body,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  async insert(@Body() body: CreateTodoDTO): Promise<void> {
    this.todoService.create(body);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() updateData: UpdateTodoDTO,
  ): Promise<void> {
    return this.todoService.updateOne(id, updateData);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    this.todoService.delete(id);
  }
}
