import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DATABASE_NAME_ENUM } from "../../../enums/database-name.enum";
import { UserEntity } from "../../auth/entity/user.entity";

@Entity({ name: DATABASE_NAME_ENUM.jobs })
export class JobsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  createdBy!: string;

  @Column({ type: "character varying", length: 50 })
  company!: string;

  @Column({ type: "character varying", length: 100 })
  position!: string;

  @Column({ type: "text" })
  technologies!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.jobsListed)
  @JoinColumn({ name: "createdBy" })
  user!: UserEntity;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;
}
