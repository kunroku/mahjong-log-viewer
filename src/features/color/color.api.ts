import { Storage } from 'src/utils/storage';

export type ColorStorageValue = {
  paiBack: number;
  tableRaxa: number;
  tableFrame: number;
};

export const storage = new Storage<ColorStorageValue>('color');
