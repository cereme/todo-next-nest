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

  findAll(ownerId): Promise<Todo[]> {
    return this.todoRepository.find({
      select: ['id', 'title', 'description', 'isFinished'],
      where: { owner: { id: ownerId } },
      order: { id: 'ASC' },
    });
  }

  findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id, { relations: ['owner'] });
  }

  async create(dto: CreateTodoDTO, ownerId): Promise<InsertResult> {
    return this.todoRepository.insert({ ...dto, owner: ownerId });
  }

  async updateOne(id: number, dto: UpdateTodoDTO): Promise<void> {
    await this.todoRepository.update(id, dto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.todoRepository.delete(id);
  }
}
