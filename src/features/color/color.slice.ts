import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { storage, ColorStorageValue } from './color.api';

export interface ColorState {
  status: 'idle' | 'loading';
  value: ColorStorageValue;
}

const initialState: ColorState = {
  status: 'idle',
  value: {
    paiBack: 0xff8c11,
    tableRaxa: 0x006f6f,
    tableFrame: 0x333333,
  },
};

export const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<ColorStorageValue>>) => {
      storage.value = { ...state.value, ...action.payload };
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { update } = colorSlice.actions;

export const selectColor = (state: RootState) => state.color.value;

export type ColorStateConsumerProps = {
  config: ColorState['value'];
};

export default colorSlice.reducer;
