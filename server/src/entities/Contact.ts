import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./User";

@Entity()
export class Contact extends BaseEntity {
  @ManyToOne(() => User)
  contact: User;

  @PrimaryColumn()
  contactId: number;

  @ManyToOne(() => User)
  user: User;

  @PrimaryColumn()
  userId: number;
}
