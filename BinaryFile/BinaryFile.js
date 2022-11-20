//import { Buffer } from "buffer";
import { kMaxLength } from "buffer";
import * as fs from "fs";

class WaveFile {
  constructor(filename) {
    const pcm = fs.readFileSync(filename);

    this.riff = pcm.toString("utf8", 0, 4); // 'RIFF'
    this.fileSize = pcm.readUint32LE(4) + 8; // filesize -8
    this.waveID = pcm.toString("utf8", 8, 12); // 'WAVE'
    this.id = pcm.toString("utf8", 12, 15); // 'fmt'
    this.size = pcm.readUint32LE(16); // size of format section
    this.format = pcm.readUint16LE(20); // 1= uncompresed PCM
    this.chanels = pcm.readUint16LE(22); // 1=mono, 2=stereo
    this.sampleRate = pcm.readUint32LE(24); // 44100,16000, 8000, ..
    this.byteRate = pcm.readUint32LE(28); // sampleRate * Chanels * (bitPerSimple/8)
    this.blockAlign = pcm.readUint16LE(32); // chanels * bitsPerSample/8
    this.bitsPerSample = pcm.readUint16LE(34); // 8,16,24 ili 32
    this.dataID = pcm.toString("utf8", 36, 40); // 'data'
    this.dataByteSize = pcm.readUint32LE(40);
    this.data = new Int16Array(
      pcm.buffer,
      pcm.byteOffset + 44,
      this.dataByteSize / Int16Array.BYTES_PER_ELEMENT
    );
  }
}

/**
 * srednja snaga signala, stopIndex nije ukljucen
 * podrazumeva 16 bitni mono kanal
 *
 * @param {Int16Array} data16
 * @param {integer} startIndex
 * @param {integer} stopIndex
 * @returns srednja kvadratna vrednost
 */
function power(data16, startIndex, stopIndex) {
  let ret = 0;
  for (let i = startIndex; i < stopIndex; i++) {
    ret += data16[i] ** 2;
  }
  return ret / (stopIndex - startIndex);
}

/**
 * Nalazi granicu signala
 *
 * @param {Int16Array} data
 * @param {integer} p
 * @param {integer} q
 * @param {integer} r
 * @param {float} treshold
 * @returns -1 leva granica | 1 desna granica | 0 kontinum
 */
function isBoundary(data, p, q, r, treshold) {
  const pl = power(data, p, q);
  const pr = power(data, q, r);

  if (pl < treshold && pr > treshold) return -1;

  if (pl > treshold && pr < treshold) return 1;

  return 0;
}

/**
 * Nalazi prvu granicu signala pocevsi od startIndex
 *
 * @param {Int16Array} data
 * @param {integer} startIndex
 * @param {integer} dataSize
 * @param {integer} winSize
 * @param {float} treshold
 * @returns
 */
function findBoundary(data, startIndex, dataSize, winSize, treshold) {
  let p = startIndex;
  let q = p + winSize;
  let r = q + winSize;

  while (!isBoundary(data, p, q, r, treshold) && r < dataSize) {
    p = q;
    q = r;
    r += winSize;
  }

  if (r >= dataSize) return dataSize - 1;

  return q;
}

const wave = new WaveFile("./f.wav");
//console.log(wave);
let index = 0;
while (index < wave.dataByteSize / 2 - 256) {
  index = findBoundary(
    wave.data,
    index,
    wave.dataByteSize / 2,
    256,
    (32768 * 0.05) ** 2
  );

  console.log(`Boundary: ${index / 16}ms`);
}
