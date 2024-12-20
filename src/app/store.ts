import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mahjongReducer from '../features/mahjong/mahjong.slice';
import configReducer from '../features/config/config.slice';
import colorReducer from 'src/features/color/color.slice';
import attentionSlice from 'src/features/attention/attention.slice';

export const store = configureStore({
  reducer: {
    color: colorReducer,
    config: configReducer,
    mahjong: mahjongReducer,
    attention: attentionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
