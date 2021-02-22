import { Todo } from 'src/todo/todo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

export enum AuthType {
  Local = 'LOCAL',
  Google = 'GOOGLE',
  Kakao = 'KAKAO',
  Naver = 'NAVER',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @Index({ unique: true, where: 'email IS NOT NULL' })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column()
  username: string;

  @Column()
  auth_type: AuthType;

  @Column({ nullable: true })
  @Index({ unique: true, where: 'auth_id IS NOT NULL' })
  auth_id!: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  created_at: Date;

  @Column({ default: true })
  activated: boolean;

  @OneToMany(() => Todo, (todo) => todo.owner) todoItems: Todo[];
}
