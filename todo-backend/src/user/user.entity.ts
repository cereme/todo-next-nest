import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column()
  username: string;

  @Column()
  auth_type: AuthType;

  @Column({ nullable: true })
  auth_id!: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  created_at: Date;

  @Column({ default: true })
  activated: boolean;
}
