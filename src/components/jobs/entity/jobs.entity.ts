import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class JobsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({ type: "varying character", length: 50 })
  company!: string;

  @Column({ type: "varying character", length: 100 })
  position!: string;

  @Column({ type: "varying character", length: 10 })
  status!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column()
  createdBy!: string;

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
