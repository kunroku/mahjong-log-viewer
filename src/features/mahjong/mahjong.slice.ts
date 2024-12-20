import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  PaiName,
  MjaiEvents,
  StartGameLog,
  ChiLog,
  PonLog,
  KakanLog,
  AnkanLog,
  DaiminkanLog,
  comparePaiName,
} from 'src/utils/mjai';
import { yamaFromSeed } from 'src/utils/yama';

export type Naki =
  | ChiLog
  | PonLog
  | (KakanLog & { target: number })
  | AnkanLog
  | DaiminkanLog;

export interface KyokuState {
  bakaze: PaiName;
  kyoku: number;
  honba: number;
  kyotaku: number;
  oya: number;
}

export interface TehaiState {
  pai: (PaiName | null)[];
  tsumo: PaiName | null;
  naki: Naki[];
}

export interface KawaState {
  pai: PaiName[];
  nakare: number[];
  tsumogiri: number[];
  reach: number;
}

export interface YamaState {
  tsumoyama: PaiName[];
  wanpai: PaiName[];
}

export enum GAME_MODE {
  MATCH,
  WATCH,
  LOG,
}

export interface MahjongState {
  status: 'idle' | 'loading';
  value: {
    mode: GAME_MODE;
    seed: string | null;
    player: number;
    scores: number[];
    deltas: number[];
    events: MjaiEvents[];
    kyoku: KyokuState;
    yama: YamaState;
    tehais: TehaiState[];
    kawas: KawaState[];
  };
}

const initialState: MahjongState = {
  status: 'idle',
  value: {
    mode: GAME_MODE.LOG,
    seed: null,
    player: 0,
    events: [],
    scores: [0, 0, 0, 0],
    deltas: [0, 0, 0, 0],
    kyoku: {
      bakaze: '?',
      kyoku: 0,
      honba: 0,
      kyotaku: 0,
      oya: -1,
    },
    yama: {
      tsumoyama: [],
      wanpai: [],
    },
    tehais: [...new Array(4)].map(() => ({
      pai: [],
      tsumo: null,
      naki: [],
    })),
    kawas: [...new Array(4)].map(() => ({
      pai: [],
      nakare: [],
      tsumogiri: [],
      reach: -1,
    })),
  },
};

export const mahjongSlice = createSlice({
  name: 'mahjong',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = initialState.value;
    },
    init: (state, action: PayloadAction<StartGameLog>) => {
      console.log(action.payload);
      if (action.payload.type === 'start_game') {
        state.value = {
          ...initialState.value,
          seed: Buffer.from(action.payload.seed).toString('base64') || null,
        };
      }
    },
    update: (state, action: PayloadAction<MjaiEvents>) => {
      if (!state.value) return;
      // console.log(action.payload);
      switch (action.payload.type) {
        case 'start_kyoku': {
          const {
            bakaze,
            dora_marker,
            kyoku,
            honba,
            kyotaku,
            oya,
            scores,
            tehais,
          } = action.payload;
          state.value.events = [];
          state.value.kyoku = { bakaze, kyoku, honba, kyotaku, oya };
          state.value.scores = scores;
          state.value.tehais = tehais.map((tehai) => ({
            pai: [...tehai].sort(comparePaiName),
            tsumo: null,
            naki: [],
            open: false,
          }));
          const seed = state.value.seed
            ? `${state.value.seed}-${bakaze}-${kyoku}-${honba}`
            : '';
          const yama = yamaFromSeed(seed);
          state.value.kawas = [...new Array(4)].map(() => ({
            pai: [],
            nakare: [],
            tsumogiri: [],
            reach: -1,
            dark: false,
          }));
          state.value.yama = {
            // tsumoyama: [...new Array(136 - 14 - 13 * 4)].map(() => '?'),
            // wanpai: [...new Array(14)].map((_, i) =>
            //   i === 9 ? dora_marker : '?',
            // ),
            tsumoyama: [...new Array(136 - 14 - 13 * 4)].map(
              (_, i) => yama[i + 14] as PaiName,
            ),
            wanpai: [...new Array(14)].map((_, i) =>
              i === 9 ? dora_marker : (yama[i] as PaiName),
            ),
          };
          break;
        }
        case 'tsumo': {
          const { actor, pai } = action.payload;
          const prev = state.value.events[state.value.events.length - 1];
          const isRinshan =
            prev.type === 'ankan' ||
            prev.type === 'kakan' ||
            prev.type === 'daiminkan';
          for (let i = 0; i < 4; i++) {
            const tsumo = state.value.tehais[i].tsumo;
            state.value.tehais[i].tsumo = null;
            if (tsumo) {
              state.value.tehais[i].pai = [
                ...state.value.tehais[i].pai.filter((e) => e !== null),
                tsumo,
              ];
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            } else {
              state.value.tehais[i].pai = state.value.tehais[i].pai.filter(
                (e) => e !== null,
              );
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            }
          }
          if (isRinshan) {
            state.value.yama.wanpai.pop();
          } else {
            state.value.yama.tsumoyama.pop();
          }
          state.value.tehais[actor].tsumo = pai;
          break;
        }
        case 'dahai': {
          const { actor, pai, tsumogiri } = action.payload;
          if (tsumogiri) {
            state.value.tehais[actor].tsumo = null;
            state.value.kawas[actor].tsumogiri.push(
              state.value.kawas[actor].pai.length,
            );
          } else {
            const index = state.value.tehais[actor].pai.indexOf(pai);
            state.value.tehais[actor].pai[index] = null;
          }
          state.value.kawas[actor].pai.push(pai);
          break;
        }
        case 'pon': {
          const { actor, target, consumed } = action.payload;
          for (let i = 0; i < 4; i++) {
            const tsumo = state.value.tehais[i].tsumo;
            state.value.tehais[i].tsumo = null;
            if (tsumo) {
              state.value.tehais[i].pai = [
                ...state.value.tehais[i].pai.filter((e) => e !== null),
                tsumo,
              ];
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            } else {
              state.value.tehais[i].pai = state.value.tehais[i].pai.filter(
                (e) => e !== null,
              );
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            }
          }
          for (const pai of consumed) {
            const index = state.value.tehais[actor].pai.indexOf(pai);
            state.value.tehais[actor].pai.splice(index, 1);
          }
          state.value.kawas[target].nakare.push(
            state.value.kawas[target].pai.length - 1,
          );
          state.value.tehais[actor].naki.push(action.payload);
          break;
        }
        case 'chi': {
          const { actor, target, consumed } = action.payload;
          for (let i = 0; i < 4; i++) {
            const tsumo = state.value.tehais[i].tsumo;
            state.value.tehais[i].tsumo = null;
            if (tsumo) {
              state.value.tehais[i].pai = [
                ...state.value.tehais[i].pai.filter((e) => e !== null),
                tsumo,
              ];
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            } else {
              state.value.tehais[i].pai = state.value.tehais[i].pai.filter(
                (e) => e !== null,
              );
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            }
          }
          for (const pai of consumed) {
            const index = state.value.tehais[actor].pai.indexOf(pai);
            state.value.tehais[actor].pai.splice(index, 1);
          }
          state.value.kawas[target].nakare.push(
            state.value.kawas[target].pai.length - 1,
          );
          state.value.tehais[actor].naki.push(action.payload);
          break;
        }
        case 'kakan': {
          const { actor, pai, consumed } = action.payload;
          const tsumo = state.value.tehais[actor].tsumo as PaiName;
          const ponIndex = state.value.tehais[actor].naki.findIndex(
            (e) => e.type === 'pon' && e.consumed.includes(consumed[0]),
          );
          const pon = state.value.tehais[actor].naki[ponIndex] as PonLog;
          state.value.tehais[actor].tsumo = null;
          state.value.tehais[actor].pai.push(tsumo);
          (state.value.tehais[actor].pai as PaiName[]).sort(comparePaiName);
          const paiIndex = state.value.tehais[actor].pai.indexOf(pai);
          state.value.tehais[actor].pai.splice(paiIndex, 1);
          if (!pon) break;
          state.value.tehais[actor].naki[ponIndex] = {
            ...action.payload,
            target: pon.target,
          };
          break;
        }
        case 'ankan': {
          const { actor, consumed } = action.payload;
          const tsumo = state.value.tehais[actor].tsumo as PaiName;
          state.value.tehais[actor].tsumo = null;
          state.value.tehais[actor].pai.push(tsumo);
          (state.value.tehais[actor].pai as PaiName[]).sort(comparePaiName);
          for (const pai of consumed) {
            const index = state.value.tehais[actor].pai.indexOf(pai);
            state.value.tehais[actor].pai.splice(index, 1);
          }
          state.value.tehais[actor].naki.push(action.payload);
          break;
        }
        case 'daiminkan': {
          const { actor, target, consumed } = action.payload;
          for (let i = 0; i < 4; i++) {
            const tsumo = state.value.tehais[i].tsumo;
            state.value.tehais[i].tsumo = null;
            if (tsumo) {
              state.value.tehais[i].pai = [
                ...state.value.tehais[i].pai.filter((e) => e !== null),
                tsumo,
              ];
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            } else {
              state.value.tehais[i].pai = state.value.tehais[i].pai.filter(
                (e) => e !== null,
              );
              (state.value.tehais[i].pai as PaiName[]).sort(comparePaiName);
            }
          }
          for (const pai of consumed) {
            const index = state.value.tehais[actor].pai.indexOf(pai);
            state.value.tehais[actor].pai.splice(index, 1);
          }
          state.value.kawas[target].nakare.push(
            state.value.kawas[target].pai.length - 1,
          );
          state.value.tehais[actor].naki.push(action.payload);
          break;
        }
        case 'dora': {
          const { dora_marker } = action.payload;
          let count = 1;
          for (const e of state.value.events) {
            if (e.type === 'dora') count++;
          }
          state.value.yama.wanpai[9 - 2 * count] = dora_marker;
          break;
        }
        case 'reach': {
          const { actor } = action.payload;
          state.value.kawas[actor].reach = state.value.kawas[actor].pai.length;
          break;
        }
        case 'reach_accepted': {
          const { actor } = action.payload;
          state.value.scores[actor] -= 1000;
          break;
        }
        case 'hora': {
          // const { actor, target, deltas, ura_markers } = action.payload;
          const { ura_markers } = action.payload;
          for (let i = 0; i < ura_markers.length; i++) {
            state.value.yama.wanpai[8 - i * 2] = ura_markers[i];
          }
          break;
        }
        case 'ryukyoku': {
          // const { deltas } = action.payload;
          break;
        }
        case 'end_kyoku': {
          break;
        }
        case 'end_game': {
          break;
        }
        default: {
          break;
        }
      }
      state.value.events.push(action.payload);
    },
    rollback: (state) => {
      if (!state.value) return;
      const latest = state.value.events.pop();
      if (latest) {
        switch (latest.type) {
          case 'start_game': {
            break;
          }
          default: {
            break;
          }
        }
      }
    },
    jump: (state) => {
      if (state.value) {
      }
    },
    changePlayer: (state, action: PayloadAction<number>) => {
      state.value.player = action.payload;
    },
    changeMode: (state, action: PayloadAction<GAME_MODE>) => {
      state.value.mode = action.payload;
    },
  },
});

export const { clear, init, update, rollback, jump, changePlayer, changeMode } =
  mahjongSlice.actions;

export const selectMahjong = (state: RootState) => state.mahjong.value;

export type MahjongStateConsumerProps = {
  mahjong: MahjongState['value'];
};

export default mahjongSlice.reducer;
