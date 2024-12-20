import { sha512 } from './hash';

function name(id: number) {
  const i = index(id);
  const c = category(i);
  return c === 'z'
    ? z(num(i))
    : num(i) + 1 === 5 && id % 4 === 0
    ? `${num(i) + 1}${c}r`
    : `${num(i) + 1}${c}`;
}
function index(id: number) {
  return Math.floor(id / 4);
}
function num(index: number) {
  return index % 9;
}
function z(num: number) {
  return ['E', 'S', 'W', 'N', 'P', 'F', 'C'][num];
}
function category(index: number) {
  if (index < 9) {
    return 'm';
  } else if (index < 18) {
    return 'p';
  } else if (index < 27) {
    return 's';
  } else {
    return 'z';
  }
}

export const yamaFromSeed = (seed: string) => {
  const sorted = new Array(136).fill(-1).map((_, i) => i);
  const shuffled: number[] = [];
  for (let i = 0; i < 136; i++) {
    const hash = sha512(Buffer.from(seed, 'utf-8'));
    const index = hash.reduce(
      (prev, current) => (prev + current) % sorted.length,
    );
    shuffled.push(sorted[index]);
    sorted.splice(index, 1);
  }
  return shuffled.map(name);
};
