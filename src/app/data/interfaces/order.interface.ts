﻿import {Composition} from './composition.interface';

export interface Order {
  id: number,
  title: string,
  compositions: Composition[],
  createdAt: Date | string,
}
