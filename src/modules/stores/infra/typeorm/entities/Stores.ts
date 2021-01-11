import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Account from '@modules/accounts/infra/typeorm/entities/Account';

@Entity('stores')
class Stores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  // @Column()
  // isBranch: boolean;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  registration: string;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Stores;
