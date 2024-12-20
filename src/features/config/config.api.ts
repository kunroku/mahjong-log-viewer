import { Storage } from 'src/utils/storage';

export enum SelectTrigger {
  hover,
  click,
}

export type ConfigStorageValue = {
  yamaOpen: boolean;
  tehaiOpen: boolean;
  selectTrigger: SelectTrigger;
};

export const storage = new Storage<ConfigStorageValue>('config');
