import {
  Controller,
  Get,
  Patch,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('owner') ownerId: number,
    @Request() req,
  ): Promise<Todo[]> {
    const user = req.user;
    if (user.id !== ownerId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.todoService.findAll(ownerId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async insert(@Body() body: CreateTodoDTO, @Request() req): Promise<void> {
    await this.todoService.create(body, req.user.id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateOne(
    @Param('id') id: number,
    @Body() updateData: UpdateTodoDTO,
    @Request() req,
  ): Promise<void> {
    const updateTarget = await this.todoService.findOne(id);
    if (updateTarget.owner.id !== req.user.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.todoService.updateOne(id, updateData);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') id: number): Promise<void> {
    await this.todoService.delete(id);
  }
}
