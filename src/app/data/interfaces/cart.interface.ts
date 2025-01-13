import {Composition} from './composition.interface';

export interface Cart {
  id: number,
  title: string,
  compositions: Composition[],
  createdAt: Date | string,
}
