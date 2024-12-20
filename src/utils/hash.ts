export const SHA512_HASH_BYTES = 64;

class U64 {
  hi: number;
  lo: number;
  constructor(h: number, l: number) {
    this.hi = h | (0 >>> 0);
    this.lo = l | (0 >>> 0);
  }
}

const iv = new Uint8Array([
  0x6a, 0x09, 0xe6, 0x67, 0xf3, 0xbc, 0xc9, 0x08, 0xbb, 0x67, 0xae, 0x85, 0x84,
  0xca, 0xa7, 0x3b, 0x3c, 0x6e, 0xf3, 0x72, 0xfe, 0x94, 0xf8, 0x2b, 0xa5, 0x4f,
  0xf5, 0x3a, 0x5f, 0x1d, 0x36, 0xf1, 0x51, 0x0e, 0x52, 0x7f, 0xad, 0xe6, 0x82,
  0xd1, 0x9b, 0x05, 0x68, 0x8c, 0x2b, 0x3e, 0x6c, 0x1f, 0x1f, 0x83, 0xd9, 0xab,
  0xfb, 0x41, 0xbd, 0x6b, 0x5b, 0xe0, 0xcd, 0x19, 0x13, 0x7e, 0x21, 0x79,
]);

const K = [
  new U64(0x428a2f98, 0xd728ae22),
  new U64(0x71374491, 0x23ef65cd),
  new U64(0xb5c0fbcf, 0xec4d3b2f),
  new U64(0xe9b5dba5, 0x8189dbbc),
  new U64(0x3956c25b, 0xf348b538),
  new U64(0x59f111f1, 0xb605d019),
  new U64(0x923f82a4, 0xaf194f9b),
  new U64(0xab1c5ed5, 0xda6d8118),
  new U64(0xd807aa98, 0xa3030242),
  new U64(0x12835b01, 0x45706fbe),
  new U64(0x243185be, 0x4ee4b28c),
  new U64(0x550c7dc3, 0xd5ffb4e2),
  new U64(0x72be5d74, 0xf27b896f),
  new U64(0x80deb1fe, 0x3b1696b1),
  new U64(0x9bdc06a7, 0x25c71235),
  new U64(0xc19bf174, 0xcf692694),
  new U64(0xe49b69c1, 0x9ef14ad2),
  new U64(0xefbe4786, 0x384f25e3),
  new U64(0x0fc19dc6, 0x8b8cd5b5),
  new U64(0x240ca1cc, 0x77ac9c65),
  new U64(0x2de92c6f, 0x592b0275),
  new U64(0x4a7484aa, 0x6ea6e483),
  new U64(0x5cb0a9dc, 0xbd41fbd4),
  new U64(0x76f988da, 0x831153b5),
  new U64(0x983e5152, 0xee66dfab),
  new U64(0xa831c66d, 0x2db43210),
  new U64(0xb00327c8, 0x98fb213f),
  new U64(0xbf597fc7, 0xbeef0ee4),
  new U64(0xc6e00bf3, 0x3da88fc2),
  new U64(0xd5a79147, 0x930aa725),
  new U64(0x06ca6351, 0xe003826f),
  new U64(0x14292967, 0x0a0e6e70),
  new U64(0x27b70a85, 0x46d22ffc),
  new U64(0x2e1b2138, 0x5c26c926),
  new U64(0x4d2c6dfc, 0x5ac42aed),
  new U64(0x53380d13, 0x9d95b3df),
  new U64(0x650a7354, 0x8baf63de),
  new U64(0x766a0abb, 0x3c77b2a8),
  new U64(0x81c2c92e, 0x47edaee6),
  new U64(0x92722c85, 0x1482353b),
  new U64(0xa2bfe8a1, 0x4cf10364),
  new U64(0xa81a664b, 0xbc423001),
  new U64(0xc24b8b70, 0xd0f89791),
  new U64(0xc76c51a3, 0x0654be30),
  new U64(0xd192e819, 0xd6ef5218),
  new U64(0xd6990624, 0x5565a910),
  new U64(0xf40e3585, 0x5771202a),
  new U64(0x106aa070, 0x32bbd1b8),
  new U64(0x19a4c116, 0xb8d2d0c8),
  new U64(0x1e376c08, 0x5141ab53),
  new U64(0x2748774c, 0xdf8eeb99),
  new U64(0x34b0bcb5, 0xe19b48a8),
  new U64(0x391c0cb3, 0xc5c95a63),
  new U64(0x4ed8aa4a, 0xe3418acb),
  new U64(0x5b9cca4f, 0x7763e373),
  new U64(0x682e6ff3, 0xd6b2b8a3),
  new U64(0x748f82ee, 0x5defb2fc),
  new U64(0x78a5636f, 0x43172f60),
  new U64(0x84c87814, 0xa1f0ab72),
  new U64(0x8cc70208, 0x1a6439ec),
  new U64(0x90befffa, 0x23631e28),
  new U64(0xa4506ceb, 0xde82bde9),
  new U64(0xbef9a3f7, 0xb2c67915),
  new U64(0xc67178f2, 0xe372532b),
  new U64(0xca273ece, 0xea26619c),
  new U64(0xd186b8c7, 0x21c0c207),
  new U64(0xeada7dd6, 0xcde0eb1e),
  new U64(0xf57d4f7f, 0xee6ed178),
  new U64(0x06f067aa, 0x72176fba),
  new U64(0x0a637dc5, 0xa2c898a6),
  new U64(0x113f9804, 0xbef90dae),
  new U64(0x1b710b35, 0x131c471b),
  new U64(0x28db77f5, 0x23047d84),
  new U64(0x32caab7b, 0x40c72493),
  new U64(0x3c9ebe0a, 0x15c9bebc),
  new U64(0x431d67c4, 0x9c100d4c),
  new U64(0x4cc5d4be, 0xcb3e42b6),
  new U64(0x597f299c, 0xfc657e2a),
  new U64(0x5fcb6fab, 0x3ad6faec),
  new U64(0x6c44198c, 0x4a475817),
];

const add64 = (...args: U64[]) => {
  let a = 0,
    b = 0,
    c = 0,
    d = 0;
  const m16 = 65535;
  for (let i = 0; i < args.length; i++) {
    const l = args[i].lo;
    const h = args[i].hi;
    a += l & m16;
    b += l >>> 16;
    c += h & m16;
    d += h >>> 16;
  }
  b += a >>> 16;
  c += b >>> 16;
  d += c >>> 16;
  return new U64((c & m16) | (d << 16), (a & m16) | (b << 16));
};

const xor64 = (...args: U64[]) => {
  let l = 0,
    h = 0;
  for (let i = 0; i < args.length; i++) {
    l ^= args[i].lo;
    h ^= args[i].hi;
  }
  return new U64(h, l);
};

const R = (x: U64, c: number) => {
  let h: number, l: number;
  const c1 = 32 - c;
  if (c < 32) {
    h = (x.hi >>> c) | (x.lo << c1);
    l = (x.lo >>> c) | (x.hi << c1);
  } else if (c < 64) {
    h = (x.lo >>> c) | (x.hi << c1);
    l = (x.hi >>> c) | (x.lo << c1);
  } else {
    h = 0;
    l = 0;
  }
  return new U64(h, l);
};

const shr64 = (x: U64, c: number) => {
  return new U64(x.hi >>> c, (x.lo >>> c) | (x.hi << (32 - c)));
};

const Ch = (x: U64, y: U64, z: U64) => {
  const h = (x.hi & y.hi) ^ (~x.hi & z.hi);
  const l = (x.lo & y.lo) ^ (~x.lo & z.lo);
  return new U64(h, l);
};

const Maj = (x: U64, y: U64, z: U64) => {
  const h = (x.hi & y.hi) ^ (x.hi & z.hi) ^ (y.hi & z.hi);
  const l = (x.lo & y.lo) ^ (x.lo & z.lo) ^ (y.lo & z.lo);
  return new U64(h, l);
};

const Sigma0 = (x: U64) => {
  return xor64(R(x, 28), R(x, 34), R(x, 39));
};
const Sigma1 = (x: U64) => {
  return xor64(R(x, 14), R(x, 18), R(x, 41));
};
const sigma0 = (x: U64) => {
  return xor64(R(x, 1), R(x, 8), shr64(x, 7));
};
const sigma1 = (x: U64) => {
  return xor64(R(x, 19), R(x, 61), shr64(x, 6));
};

const ts64 = (x: Uint8Array, i: number, u: U64) => {
  x[i] = (u.hi >> 24) & 0xff;
  x[i + 1] = (u.hi >> 16) & 0xff;
  x[i + 2] = (u.hi >> 8) & 0xff;
  x[i + 3] = u.hi & 0xff;
  x[i + 4] = (u.lo >> 24) & 0xff;
  x[i + 5] = (u.lo >> 16) & 0xff;
  x[i + 6] = (u.lo >> 8) & 0xff;
  x[i + 7] = u.lo & 0xff;
};

const dl64 = (x: Uint8Array, i: number) => {
  const h = (x[i] << 24) | (x[i + 1] << 16) | (x[i + 2] << 8) | x[i + 3];
  const l = (x[i + 4] << 24) | (x[i + 5] << 16) | (x[i + 6] << 8) | x[i + 7];
  return new U64(h, l);
};

const cryptoHashBlocks = (x: Uint8Array, m: Uint8Array, n: number) => {
  const z = [],
    b = [],
    a = [],
    w = [];

  for (let i = 0; i < 8; i++) {
    z[i] = a[i] = dl64(x, 8 * i);
  }

  let pos = 0;
  while (n >= 128) {
    for (let i = 0; i < 16; i++) {
      w[i] = dl64(m, 8 * i + pos);
    }
    for (let i = 0; i < 80; i++) {
      for (let j = 0; j < 8; j++) {
        b[j] = a[j];
      }
      const t = add64(
        a[7],
        Sigma1(a[4]),
        Ch(a[4], a[5], a[6]),
        K[i],
        w[i % 16],
      );
      b[7] = add64(t, Sigma0(a[0]), Maj(a[0], a[1], a[2]));
      b[3] = add64(b[3], t);
      for (let j = 0; j < 8; j++) a[(j + 1) % 8] = b[j];
      if (i % 16 === 15) {
        for (let j = 0; j < 16; j++) {
          w[j] = add64(
            w[j],
            w[(j + 9) % 16],
            sigma0(w[(j + 1) % 16]),
            sigma1(w[(j + 14) % 16]),
          );
        }
      }
    }

    for (let i = 0; i < 8; i++) {
      a[i] = add64(a[i], z[i]);
      z[i] = a[i];
    }

    pos += 128;
    n -= 128;
  }
  for (let i = 0; i < 8; i++) {
    ts64(x, 8 * i, z[i]);
  }
  return n;
};

const checkArrayTypes = (buffer: Buffer | Uint8Array) => {
  if (!(buffer instanceof Uint8Array) || !(buffer instanceof Buffer)) {
    throw new TypeError('unexpected type, use Uint8Array or Buffer');
  }
};

const cryptoHash = (out: Uint8Array, m: Uint8Array, n: number) => {
  const h = new Uint8Array(64);
  const x = new Uint8Array(256);
  const b = n;
  for (let i = 0; i < 64; i++) {
    h[i] = iv[i];
  }
  cryptoHashBlocks(h, m, n);
  n %= 128;
  for (let i = 0; i < 256; i++) {
    x[i] = 0;
  }
  for (let i = 0; i < n; i++) {
    x[i] = m[b - n + i];
  }
  x[n] = 128;
  n = 256 - 128 * (n < 112 ? 1 : 0);
  x[n - 9] = 0;
  ts64(x, n - 8, new U64((b / 0x20000000) | 0, b << 3));
  cryptoHashBlocks(h, x, n);
  for (let i = 0; i < 64; i++) {
    out[i] = h[i];
  }
};

export const sha512 = (buffer: Buffer | Uint8Array) => {
  checkArrayTypes(buffer);
  const h = new Uint8Array(SHA512_HASH_BYTES);
  cryptoHash(h, Uint8Array.from(buffer), buffer.length);
  return Buffer.from(h);
};
