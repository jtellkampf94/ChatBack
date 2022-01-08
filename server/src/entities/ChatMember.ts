import {
  Entity,
  ManyToOne,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity("public.chat_member")
export class ChatMember extends BaseEntity {
  @PrimaryColumn()
  chatId!: number;

  @PrimaryColumn()
  userId!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
