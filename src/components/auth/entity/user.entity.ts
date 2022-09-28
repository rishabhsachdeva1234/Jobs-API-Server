import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from "typeorm";
import { DATABASE_NAME_ENUM } from "../../../enums/database-name.enum";
import { hash, compare } from "bcrypt";
import { LoginSessionEntity } from "../../login-session/entity/login-session.entity";
import { JobsEntity } from "../../jobs/entity/jobs.entity";
import { userRoles } from "../../../constants/user-roles.constant";

@Entity({ name: DATABASE_NAME_ENUM.user })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "character varying", length: 20 })
  firstName!: string;

  @Column({ type: "character varying", length: 20 })
  lastName!: string;

  @Column({ type: "character varying", length: 50, unique: true })
  email!: string;

  @Column({ type: "character varying", length: 255 })
  password!: string;

  @Column({ type: "character varying", length: 7 })
  gender!: string;

  @Column({ type: "date" })
  dateOfBirth!: Date;

  @Column({
    type: "enum",
    enum: userRoles,
    default: userRoles["1"],
  })
  role!: typeof userRoles[number];

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

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

  @OneToOne(
    () => LoginSessionEntity,
    (LoginSessionEntity) => LoginSessionEntity.user
  )
  loginSession!: LoginSessionEntity;

  @OneToMany(() => JobsEntity, (JobsEntity) => JobsEntity.user)
  jobsListed!: JobsEntity[];

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(unhashedPass: string) {
    const result = await compare(unhashedPass, this.password);
    return result || unhashedPass === this.password;
  }
}
