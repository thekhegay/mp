import { ItemType } from './item-type';

export interface Item {
  id: string;
  type: ItemType,
  name: string;
  production: string;
  charge: number;
  node: string;
  longitude: number;
  latitude: number;
  timestamp: number;
}
