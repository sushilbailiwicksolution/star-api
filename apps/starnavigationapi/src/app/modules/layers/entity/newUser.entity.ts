import { UserTypeEnum } from '../../../enum/user.type.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ExtendEntity } from './extend.entity';

@Entity({name:"newUsers"})
export class NewUserEntity extends ExtendEntity {
    
  @Column({ type: "enum", enum: UserTypeEnum, default: UserTypeEnum.USER || "USER" })
  accountType: UserTypeEnum;

  @Column()
  active: boolean;

  @Column()
  canChangePassword: boolean;

  @Column()
  customerId: number;

  @Column()
  email_id: string;

  @Column()
  expires_on: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  login_id: string;

  @Column()
  neverExpire: boolean;

  @Column()
  password: string;

  @Column()
  phone_no: string;

  @Column()
  retype_password: string;

  @Column()
  username: string;
}
