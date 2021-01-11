import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('account')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated()
  agency: number;

  @Column()
  @Generated('increment')
  numberAccount: number;

  @Column()
  balance: number;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Account;
