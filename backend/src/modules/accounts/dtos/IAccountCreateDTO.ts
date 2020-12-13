import {TypeAccount} from '../infra/typeorm/entities/Account';
import User from "@modules/users/infra/typeorm/entities/User";
import Stores from "@modules/stores/infra/typeorm/entities/Stores";

export default interface IAccountCreateDTO {
  type: TypeAccount,
  user?: User,
  store?: Stores,
  balance?: number,
  active?: boolean,
}
