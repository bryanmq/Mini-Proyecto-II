import { IGasto } from './igasto';

export interface IPresupuesto {
  id?: string;
  presupuesto: number;
  divisa?: string;
  totalgasto: number;
  balance: number;
  listagastos?: IGasto[];
}
