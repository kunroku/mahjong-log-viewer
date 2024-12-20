import { PaiSize } from 'src/components/atoms/Pai';
import { Naki } from 'src/features/mahjong/mahjong.slice';

export type DimentionItem = [x: number, y: number, z: number];

export type Dimention = {
  position: DimentionItem;
  rotation: DimentionItem;
};

const positionByActor = (
  actor: number,
  x: number,
  y: number,
  z: number,
): DimentionItem =>
  [
    [x, y, z],
    [z, y, -x],
    [-x, y, -z],
    [-z, y, x],
  ][actor] as DimentionItem;

const rotationByActor = (
  actor: number,
  x: number,
  y: number,
  z: number,
): DimentionItem =>
  [
    [x, y, z],
    [y, z, -x],
    [-x, y, -z],
    [-y, z, x],
    // [x, y, z],
    // [y, x, -z],
    // [-x, y, -z],
    // [-y, x, z],
  ][actor] as DimentionItem;

const kawaOriginDimention = (actor: number): Dimention => {
  const rotation = [0, actor * (Math.PI / 2), 0] as DimentionItem;
  const x = PaiSize.x * -2.5;
  const y = PaiSize.z * 0.5;
  const z = PaiSize.x * 3 + PaiSize.y * 0.5;
  const position = positionByActor(actor, x, y, z);
  return { position, rotation };
};

export const kawaPaiDimention = (
  actor: number,
  index: number,
  reach: number,
  isPending: boolean,
) => {
  const _kawaPaisPerLine = 6;
  const { position, rotation } = kawaOriginDimention(actor);
  const row = Math.floor(index / _kawaPaisPerLine);
  const column = index % _kawaPaisPerLine;
  const isReach = index === reach;
  const isAfterReach =
    0 <= reach && reach < index && row === Math.floor(reach / _kawaPaisPerLine);
  const x =
    PaiSize.x * column +
    (isReach ? (PaiSize.y - PaiSize.x) / 2 : 0) +
    (isAfterReach ? PaiSize.y - PaiSize.x : 0) +
    (isPending ? PaiSize.x * 0.2 : 0);
  const y = 0;
  const z =
    PaiSize.y * row +
    (isReach ? (PaiSize.y - PaiSize.x) / 2 : 0) +
    (isPending ? PaiSize.y * 0.1 : 0);
  const _position = positionByActor(actor, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  rotation[1] += isReach ? Math.PI / 2 : 0;
  return { position, rotation };
};

const tehaiOriginDimention = (actor: number, isOpen: boolean): Dimention => {
  const rX = isOpen ? 0 : Math.PI * 0.5;
  const rY = actor * (Math.PI / 2);
  const rZ = 0;
  const rotation = (
    isOpen ? [rX, rY, rZ] : rotationByActor(actor, rX, rY, rZ)
  ) as DimentionItem;
  const x = -PaiSize.x * 7;
  const y = isOpen ? PaiSize.z * 0.5 : PaiSize.y * 0.5;
  const z = 8.4;
  const position = positionByActor(actor, x, y, z);
  return { position, rotation };
};

export const tehaiPaiDimention = (
  actor: number,
  index: number,
  isOpen: boolean,
) => {
  const { position, rotation } = tehaiOriginDimention(actor, isOpen);
  const x = PaiSize.x * index;
  const y = 0;
  const z = 0;
  const _position = positionByActor(actor, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  return { position, rotation };
};

export const tehaiTsumoPaiDimention = (
  actor: number,
  paiLength: number,
  isOpen: boolean,
) => {
  const { position, rotation } = tehaiOriginDimention(actor, isOpen);
  const x = PaiSize.x * paiLength + 0.15;
  const y = 0;
  const z = 0;
  const _position = positionByActor(actor, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  return { position, rotation };
};

const tsumoyamaOriginDimention = (
  actor: number,
  isOpen: boolean,
): Dimention => {
  const rotation = [
    isOpen ? 0 : Math.PI,
    actor * (Math.PI / 2),
    0,
  ] as DimentionItem;
  const x = PaiSize.x * 15;
  const y = PaiSize.z * 0.5;
  const z = PaiSize.x * 3 + PaiSize.y * 0.5 + PaiSize.y * 3.6;
  const position = positionByActor(actor, x, y, z);
  return { position, rotation };
};

export const tsumoyamaPaiDimention = (
  index: number,
  isOpen: boolean,
): Dimention => {
  const actor = index < 4 ? 0 : index < 26 ? 1 : index < 48 ? 2 : 3;
  const { position, rotation } = tsumoyamaOriginDimention(actor, isOpen);
  const _index = index - actor * 22;
  const row = 11 - Math.floor(_index / 2);
  const isUpper = index % 2 === 1;
  const x = PaiSize.x * -row;
  const y = isOpen ? 0 : isUpper ? PaiSize.z : 0;
  const z = isOpen ? (isUpper ? -PaiSize.y / 2 : PaiSize.y / 2) : 0;
  const _position = positionByActor(actor, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  return { position, rotation };
};

const wangpaiOriginDimention = (isOpen: boolean): Dimention => {
  const rotation = [isOpen ? 0 : Math.PI, 0, 0] as DimentionItem;
  const x = PaiSize.x * 1;
  const y = PaiSize.z * 0.5;
  const z = PaiSize.x * 3 + PaiSize.y * 0.5 + PaiSize.y * 3.6;
  const position = positionByActor(0, x, y, z);
  return { position, rotation };
};

export const wangpaiPaiDimention = (
  index: number,
  isOpen: boolean,
  doraCount: number,
): Dimention => {
  [...new Array(doraCount)].map((_, i) => 9 - 2 * i).includes(index);
  const { position, rotation } = wangpaiOriginDimention(isOpen);
  const row = Math.floor(index / 2);
  const isUpper = index % 2 === 1;
  const x = PaiSize.x * -row;
  const y = isOpen ? 0 : isUpper ? PaiSize.z : 0;
  const z = isOpen ? (isUpper ? -PaiSize.y / 2 : PaiSize.y / 2) : 0;
  const _position = positionByActor(0, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  if ([...new Array(doraCount)].map((_, i) => 9 - 2 * i).includes(index)) {
    rotation[0] = 0;
  }
  return { position, rotation };
};

export const nakiDimention = (
  actor: number,
  nakis: Naki[],
  nakiIndex: number,
  paiIndex: number,
) => {
  const { position, rotation } = tehaiOriginDimention(actor, true);
  const padding = nakis
    .map((n, i) =>
      i < nakiIndex
        ? n.type === 'ankan'
          ? PaiSize.x * 4
          : n.type === 'daiminkan'
          ? PaiSize.x * 3 + PaiSize.y
          : PaiSize.x * 2 + PaiSize.y
        : 0,
    )
    .reduce((x, y) => x + y);
  const naki = nakis[nakiIndex];
  const _position = [11 - padding, 0, 0];
  switch (naki.type) {
    case 'chi': {
      const sideway = 0;
      const paiIndicies = [0, 1, 2];
      const i = paiIndicies.indexOf(paiIndex);
      _position[0] +=
        PaiSize.x * i - (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0);
      _position[2] += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      rotation[1] += sideway === i ? Math.PI / 2 : 0;
      break;
    }
    case 'pon': {
      const sideway = (naki.actor + 3 - naki.target) % 4;
      const paiIndicies: number[] = [
        [0, 1, 2],
        [1, 0, 2],
        [1, 2, 0],
      ][sideway];
      const i = paiIndicies.indexOf(paiIndex);
      _position[0] +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      _position[2] += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      rotation[1] += sideway === i ? Math.PI / 2 : 0;
      break;
    }
    case 'daiminkan': {
      const sideway = ((naki.actor + 4 - naki.target) % 4) - 1;
      const paiIndicies: number[] = [
        [0, 1, 2, 3],
        [1, 0, 2, 3],
        [1, 2, 3, 0],
      ][sideway];
      const i = paiIndicies.indexOf(paiIndex);
      _position[0] +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      _position[2] += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      rotation[1] += sideway === i ? Math.PI / 2 : 0;
      break;
    }
    case 'kakan': {
      const sideway = ((naki.actor + 4 - naki.target) % 4) - 1;
      const paiIndicies: number[] = [
        [0, 1, 2],
        [1, 0, 2],
        [1, 2, 0],
      ][sideway];
      const i = paiIndicies.indexOf(paiIndex === 3 ? 0 : paiIndex);
      _position[0] +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      _position[2] +=
        sideway === i
          ? (PaiSize.y - PaiSize.x) / 2 - (paiIndex === 3 ? PaiSize.x : 0)
          : 0;
      rotation[1] += sideway === i ? Math.PI / 2 : 0;
      break;
    }
    case 'ankan': {
      _position[0] += PaiSize.x * paiIndex;
      rotation[1] += paiIndex % 3 === 0 ? Math.PI : 0;
      break;
    }
    default:
      break;
  }
  const __position = positionByActor(
    actor,
    _position[0],
    _position[1],
    _position[2],
  );
  position[0] += __position[0];
  position[1] += __position[1];
  position[2] += __position[2];
  return { position, rotation };
};

const tehaiControllerOriginDimention = (
  actor: number,
  big: boolean,
): Dimention => {
  const rX = Math.PI * 0.25;
  const rY = actor * (Math.PI / 2);
  const rZ = 0;
  const rotation = [
    [rX, rY, rZ],
    [rY, rX, -Math.PI / 2],
    [-rX, rY, -rZ],
    [-rY, -rX, Math.PI / 2],
  ][actor] as DimentionItem;
  const x = big ? -PaiSize.x * 6.5 : -PaiSize.x * 7.5;
  const y = big ? 12.1 : 5;
  const z = big ? 16 : 11.3;
  const position = positionByActor(actor, x, y, z);
  return { position, rotation };
};

export const tehaiControllerPaiDimention = (
  actor: number,
  index: number,
  big: boolean,
) => {
  const { position, rotation } = tehaiControllerOriginDimention(actor, big);
  const x = PaiSize.x * index;
  const y = 0;
  const z = 0;
  const _position = positionByActor(actor, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  return { position, rotation };
};

export const tehaiControllerTsumoPaiDimention = (
  actor: number,
  paiLength: number,
  big: boolean,
) => {
  const { position, rotation } = tehaiControllerOriginDimention(actor, big);
  const x = PaiSize.x * paiLength + 0.15;
  const y = 0;
  const z = 0;
  const _position = positionByActor(actor, x, y, z);
  position[0] += _position[0];
  position[1] += _position[1];
  position[2] += _position[2];
  return { position, rotation };
};
