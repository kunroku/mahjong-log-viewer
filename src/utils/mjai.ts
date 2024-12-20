export type MjaiEvent<T> = {
  type: T;
};

export type PaiName =
  | '?'
  | '1m'
  | '2m'
  | '3m'
  | '4m'
  | '5m'
  | '6m'
  | '7m'
  | '8m'
  | '9m'
  | '1p'
  | '2p'
  | '3p'
  | '4p'
  | '5p'
  | '6p'
  | '7p'
  | '8p'
  | '9p'
  | '1s'
  | '2s'
  | '3s'
  | '4s'
  | '5s'
  | '6s'
  | '7s'
  | '8s'
  | '9s'
  | 'E'
  | 'S'
  | 'W'
  | 'N'
  | 'P'
  | 'F'
  | 'C'
  | '5mr'
  | '5pr'
  | '5sr';

export const comparePaiName = (a: PaiName, b: PaiName) => {
  const paiNames = [
    '1m',
    '2m',
    '3m',
    '4m',
    '5mr',
    '5m',
    '6m',
    '7m',
    '8m',
    '9m',
    '1p',
    '2p',
    '3p',
    '4p',
    '5pr',
    '5p',
    '6p',
    '7p',
    '8p',
    '9p',
    '1s',
    '2s',
    '3s',
    '4s',
    '5sr',
    '5s',
    '6s',
    '7s',
    '8s',
    '9s',
    'E',
    'S',
    'W',
    'N',
    'P',
    'F',
    'C',
    '?',
  ];
  return paiNames.indexOf(a) - paiNames.indexOf(b);
};

export type StartGameLog = MjaiEvent<'start_game'> & {
  names: string[];
  seed: number[];
};
export type StartKyokuLog = MjaiEvent<'start_kyoku'> & {
  bakaze: PaiName;
  dora_marker: PaiName;
  kyoku: number;
  honba: number;
  kyotaku: number;
  oya: number;
  scores: number[];
  tehais: PaiName[][];
};
export type TsumoLog = MjaiEvent<'tsumo'> & {
  actor: number;
  pai: PaiName;
};
export type DahaiLog = MjaiEvent<'dahai'> & {
  actor: number;
  pai: PaiName;
  tsumogiri: boolean;
};
export type PonLog = MjaiEvent<'pon'> & {
  actor: number;
  target: number;
  pai: PaiName;
  consumed: PaiName[];
};
export type ChiLog = MjaiEvent<'chi'> & {
  actor: number;
  target: number;
  pai: PaiName;
  consumed: PaiName[];
};
export type KakanLog = MjaiEvent<'kakan'> & {
  actor: number;
  pai: PaiName;
  consumed: PaiName[];
};
export type AnkanLog = MjaiEvent<'ankan'> & {
  actor: number;
  consumed: PaiName[];
};
export type DaiminkanLog = MjaiEvent<'daiminkan'> & {
  actor: number;
  target: number;
  pai: PaiName;
  consumed: PaiName[];
};
export type DoraLog = MjaiEvent<'dora'> & {
  dora_marker: PaiName;
};
export type ReachLog = MjaiEvent<'reach'> & {
  actor: number;
};
export type ReachAcceptedLog = MjaiEvent<'reach_accepted'> & {
  actor: number;
  // deltas: number[];
  // scores: number[];
};
export type HoraLog = MjaiEvent<'hora'> & {
  actor: number;
  target: number;
  deltas: number[];
  ura_markers: PaiName[];
};
export type RyukyokuLog = MjaiEvent<'ryukyoku'> & {
  deltas: number[];
};
export type EndKyokuLog = MjaiEvent<'end_kyoku'>;
export type EndGameLog = MjaiEvent<'end_game'>;
// for match
export type NoneLog = MjaiEvent<'none'>;

export type MjaiEvents =
  | StartGameLog
  | StartKyokuLog
  | TsumoLog
  | DahaiLog
  | PonLog
  | ChiLog
  | KakanLog
  | AnkanLog
  | DaiminkanLog
  | DoraLog
  | NoneLog
  | ReachLog
  | ReachAcceptedLog
  | HoraLog
  | RyukyokuLog
  | EndKyokuLog
  | EndGameLog;

export type MjaiLog = {
  events: MjaiEvents;
};
