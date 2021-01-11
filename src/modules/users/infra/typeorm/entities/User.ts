import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Account from '@modules/accounts/infra/typeorm/entities/Account';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
