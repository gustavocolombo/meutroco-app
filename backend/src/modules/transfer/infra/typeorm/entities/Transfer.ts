import { PrimaryGeneratedColumn, JoinColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';

import Account from '@modules/accounts/infra/typeorm/entities/Account';


@Entity('transfer')
class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn({ name: 'account_sender' })
  accountSender: Account;

  @OneToOne(() => Account, { eager: true })
  @JoinColumn({ name: 'account_recipient' })
  accountRecipient: Account;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}


export default Transfer;
