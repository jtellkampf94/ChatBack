import {
  Entity,
  ManyToOne,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

import { Chat } from "./Chat";
import { User } from "./User";

@Entity()
export class ChatMember extends BaseEntity {
  @ManyToOne(() => Chat)
  chat!: Chat;

  @PrimaryColumn()
  chatId!: number;

  @ManyToOne(() => User)
  user!: User;

  @PrimaryColumn()
  userId!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
