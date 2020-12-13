import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import Stores from '@modules/stores/infra/typeorm/entities/Stores';
import User from '@modules/users/infra/typeorm/entities/User';


export enum TypeAccount {
  ENTEPRISE = 'enterprise',
  PERSONAL = 'personal'
}
@Entity('account')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TypeAccount,
    default: TypeAccount.PERSONAL
  })
  type: TypeAccount;

  @OneToOne(() => Stores, { eager: true })
  @JoinColumn({ name: 'store_id' })
  store: Stores;

  @Column()
  balance: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}


export default Account;
