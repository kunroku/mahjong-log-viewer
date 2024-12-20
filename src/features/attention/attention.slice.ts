import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AttentionState {
  status: 'idle' | 'loading';
  value: {
    uuid: string | undefined;
  };
}

const initialState: AttentionState = {
  status: 'idle',
  value: {
    uuid: undefined,
  },
};

export const attentionSlice = createSlice({
  name: 'attention',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<string | undefined>) => {
      state.value.uuid = action.payload;
    },
  },
});

export const { select } = attentionSlice.actions;

export const selectAttention = (state: RootState) => state.attention.value;

export type AttentionStateConsumerProps = {
  attention: AttentionState['value'];
};

export default attentionSlice.reducer;
