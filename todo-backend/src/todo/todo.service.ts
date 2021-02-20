import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id);
  }

  async create(dto: CreateTodoDTO): Promise<InsertResult> {
    return this.todoRepository.insert(dto);
  }

  async updateOne(id: number, dto: UpdateTodoDTO): Promise<void> {
    await this.todoRepository.update(id, dto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.todoRepository.delete(id);
  }
}
