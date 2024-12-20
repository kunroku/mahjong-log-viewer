import { Group } from 'three';
import { PaiSize } from 'src/components/atoms/Pai';
import { Naki } from 'src/features/mahjong/mahjong.slice';

export type PaiPosition = [x: number, y: number, z: number];
export type PaiRotation = [x: number, y: number, z: number];
export type PaiTransition = {
  position: PaiPosition;
  rotation: PaiRotation;
};

const positionByActor = (actor: number, position: PaiPosition): PaiPosition =>
  [
    [position[0], position[1], position[2]],
    [position[2], position[1], -position[0]],
    [-position[0], position[1], -position[2]],
    [-position[2], position[1], position[0]],
  ][actor] as PaiPosition;

export const kawaPaiTransition = (
  actor: number,
  index: number,
  reach: number,
  isPending: boolean,
): PaiTransition => {
  const pai = new Group();
  const kawaPaisPerLine = 6;
  pai.position.x = PaiSize.x * -2.5;
  pai.position.y = PaiSize.z * 0.5;
  pai.position.z = PaiSize.x * 3 + PaiSize.y * 0.5;
  const row = Math.floor(index / kawaPaisPerLine);
  const column = index % kawaPaisPerLine;
  const isReach = index === reach;
  const isAfterReach =
    0 <= reach && reach < index && row === Math.floor(reach / kawaPaisPerLine);
  pai.position.x +=
    (PaiSize.x + 0.01) * column +
    (isReach ? (PaiSize.y - PaiSize.x) / 2 : 0) +
    (isAfterReach ? PaiSize.y - PaiSize.x : 0) +
    (isPending ? PaiSize.x * 0.2 : 0);
  pai.position.z +=
    PaiSize.y * row +
    (isReach ? (PaiSize.y - PaiSize.x) / 2 : 0) +
    (isPending ? PaiSize.y * 0.1 : 0);
  pai.rotation.y += isReach ? Math.PI / 2 : 0;
  pai.rotateY(actor * (Math.PI / 2));
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const tehaiPaiTransition = (
  actor: number,
  index: number,
  isOpen: boolean,
): PaiTransition => {
  const pai = new Group();
  pai.position.x = PaiSize.x * (index - 7);
  pai.position.y = isOpen ? PaiSize.z * 0.5 : PaiSize.y * 0.5;
  pai.position.z = 8.4;
  pai.rotateY(actor * (Math.PI / 2));
  pai.rotateX(isOpen ? 0 : Math.PI / 2);
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const tehaiTsumoPaiTransition = (
  actor: number,
  paiLength: number,
  isOpen: boolean,
): PaiTransition => {
  const pai = new Group();
  pai.position.x = PaiSize.x * (paiLength + 0.15 - 7);
  pai.position.y = isOpen ? PaiSize.z * 0.5 : PaiSize.y * 0.5;
  pai.position.z = 8.4;
  pai.rotateY(actor * (Math.PI / 2));
  pai.rotateX(isOpen ? 0 : Math.PI / 2);
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const tehaiControllerPaiTransition = (
  actor: number,
  index: number,
  big: boolean,
): PaiTransition => {
  const pai = new Group();
  pai.position.x = big ? -PaiSize.x * 7.5 : -PaiSize.x * 7.5;
  pai.position.y = big ? 6.3 : 5.02;
  pai.position.z = big ? 12 : 11.3;
  pai.position.x += PaiSize.x * index;
  pai.rotateY(actor * (Math.PI / 2));
  pai.rotateX(big ? Math.PI * 0.25 : Math.PI * 0.3);
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const tehaiControllerTsumoPaiTransition = (
  actor: number,
  paiLength: number,
  big: boolean,
): PaiTransition => {
  const pai = new Group();
  pai.position.x = big ? -PaiSize.x * 7.5 : -PaiSize.x * 7.5;
  pai.position.y = big ? 6.3 : 5.02;
  pai.position.z = big ? 12 : 11.3;
  pai.position.x += PaiSize.x * paiLength + 0.15;
  pai.rotateY(actor * (Math.PI / 2));
  pai.rotateX(big ? Math.PI * 0.25 : Math.PI * 0.3);
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const tsumoyamaPaiTransition = (
  index: number,
  isOpen: boolean,
): PaiTransition => {
  const pai = new Group();
  const actor = index < 0 ? 0 : index < 24 ? 1 : index < 46 ? 2 : 3;
  const _index =
    index < 0
      ? 0
      : index < 24
      ? index - 24
      : index < 46
      ? index - 46
      : index - 70;
  const row = 9 - Math.floor(_index / 2);
  const isUpper = index % 2 === 1;
  pai.position.x = PaiSize.x * (15 - row);
  pai.position.y = PaiSize.z * 0.5 + (isOpen ? 0 : isUpper ? PaiSize.z : 0);
  pai.position.z =
    PaiSize.x * 3 +
    PaiSize.y * 0.5 +
    PaiSize.y * 3.6 +
    (isOpen ? (isUpper ? -PaiSize.y / 2 : PaiSize.y / 2) : 0);
  pai.rotateX(isOpen ? 0 : Math.PI);
  pai.rotateY(actor * (Math.PI / 2));
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const wangpaiPaiTransition = (
  index: number,
  isOpen: boolean,
  doraCount: number,
): PaiTransition => {
  const pai = new Group();
  const row = Math.floor(index / 2);
  const isUpper = index % 2 === 1;
  pai.position.x = PaiSize.x * (5 - row);
  pai.position.y = PaiSize.z * 0.5 + (isOpen ? 0 : isUpper ? PaiSize.z : 0);
  pai.position.z =
    PaiSize.x * 3 +
    PaiSize.y * 0.5 +
    PaiSize.y * 3.6 +
    (isOpen ? (isUpper ? -PaiSize.y / 2 : PaiSize.y / 2) : 0);
  pai.rotateX(isOpen ? 0 : Math.PI);
  if ([...new Array(doraCount)].map((_, i) => 9 - 2 * i).includes(index)) {
    pai.rotation.x = 0;
  }
  return {
    position: positionByActor(0, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const nakiTransition = (
  actor: number,
  nakis: Naki[],
  nakiIndex: number,
  paiIndex: number,
): PaiTransition => {
  const pai = new Group();
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
  pai.position.x = 11 - padding - PaiSize.x * 7;
  pai.position.y = PaiSize.z * 0.5;
  pai.position.z = 8.4;
  switch (naki.type) {
    case 'chi': {
      const sideway = 0;
      const paiIndicies = [0, 1, 2];
      const i = paiIndicies.indexOf(paiIndex);
      pai.position.x +=
        PaiSize.x * i - (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0);
      pai.position.z += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
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
      pai.position.x +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      pai.position.z += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
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
      pai.position.x +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      pai.position.z += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
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
      pai.position.x +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      pai.position.z +=
        sideway === i
          ? (PaiSize.y - PaiSize.x) / 2 - (paiIndex === 3 ? PaiSize.x : 0)
          : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
      break;
    }
    case 'ankan': {
      pai.position.x += PaiSize.x * paiIndex;
      pai.rotateX(paiIndex % 3 === 0 ? Math.PI : 0);
      break;
    }
    default:
      break;
  }
  pai.rotateY(actor * (Math.PI / 2));
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};

export const nakiControllerTransition = (
  actor: number,
  nakis: Naki[],
  nakiIndex: number,
  paiIndex: number,
): PaiTransition => {
  const pai = new Group();
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
  pai.position.x += 12.5 - padding - PaiSize.x * 7;
  pai.position.y += 4.3;
  pai.position.z += 11.43;
  switch (naki.type) {
    case 'chi': {
      const sideway = 0;
      const paiIndicies = [0, 1, 2];
      const i = paiIndicies.indexOf(paiIndex);
      pai.position.x +=
        PaiSize.x * i - (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0);
      pai.position.z += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
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
      pai.position.x +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
      pai.position.z += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
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
      pai.position.x +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      pai.position.z += sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
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
      pai.position.x +=
        PaiSize.x * i -
        (sideway === i ? (PaiSize.y - PaiSize.x) / 2 : 0) -
        (sideway > i ? PaiSize.y - PaiSize.x : 0);
      pai.position.z +=
        sideway === i
          ? (PaiSize.y - PaiSize.x) / 2 - (paiIndex === 3 ? PaiSize.x : 0)
          : 0;
      pai.rotateY(sideway === i ? Math.PI / 2 : 0);
      break;
    }
    case 'ankan': {
      pai.position.x += PaiSize.x * paiIndex;
      pai.rotateX(paiIndex % 3 === 0 ? Math.PI : 0);
      break;
    }
    default:
      break;
  }
  // pai.rotation.x += Math.PI * 0.25;
  // Math.sin()
  pai.rotateY(actor * (Math.PI / 2));
  return {
    position: positionByActor(actor, [
      pai.position.x,
      pai.position.y,
      pai.position.z,
    ]),
    rotation: [pai.rotation.x, pai.rotation.y, pai.rotation.z],
  };
};
