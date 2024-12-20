import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { storage, ConfigStorageValue, SelectTrigger } from './config.api';

export interface ConfigState {
  status: 'idle' | 'loading';
  value: ConfigStorageValue;
}

const initialState: ConfigState = {
  status: 'idle',
  value: {
    yamaOpen: false,
    tehaiOpen: false,
    selectTrigger: SelectTrigger.click,
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<ConfigStorageValue>>) => {
      storage.value = { ...state.value, ...action.payload };
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { update } = configSlice.actions;

export const selectConfig = (state: RootState) => state.config.value;

export type ConfigStateConsumerProps = {
  config: ConfigState['value'];
};

export default configSlice.reducer;
