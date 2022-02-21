import {
  Entity,
  ManyToOne,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";

@Entity()
export class ChatMember extends BaseEntity {
  @PrimaryColumn()
  chatId!: number;

  @PrimaryColumn()
  userId!: number;

  @ManyToOne(() => Chat, (chat) => chat.id, {
    onDelete: "CASCADE",
  })
  chat!: Chat;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
