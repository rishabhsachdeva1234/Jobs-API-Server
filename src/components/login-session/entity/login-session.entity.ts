import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { UserEntity } from "../../auth/entity/user.entity";

@Entity()
export class LoginSessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column({
    type: "character varying",
    length: 36,
    nullable: false,
    default: uuid(),
  })
  sessionKey!: string;

  @Column({
    type: "timestamp with time zone",
    nullable: false,
    default: new Date(),
  })
  lastConnection!: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @OneToOne(() => UserEntity, (UserEntity) => UserEntity.loginSession)
  @JoinColumn()
  user!: UserEntity;
}
