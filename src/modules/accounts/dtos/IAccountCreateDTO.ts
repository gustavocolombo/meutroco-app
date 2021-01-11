import User from '@modules/users/infra/typeorm/entities/User';
import Stores from '@modules/stores/infra/typeorm/entities/Stores';

export default interface IAccountCreateDTO {
  agency: number;
  numberAccount: number;
  user?: User;
  store?: Stores;
  balance?: number;
  active?: boolean;
}
