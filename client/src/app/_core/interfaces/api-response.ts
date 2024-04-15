import { Item } from './item';

export interface ApiResponse {
  payload: Item[];
  timestamp: number;
}
