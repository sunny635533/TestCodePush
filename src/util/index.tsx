export { copyWith, splitEvery } from '@src/util/objects';
export { absurd } from '@src/util/type-level';
export { delay, timeout, withRetry } from '@src/util/promises';
export { isIphoneX } from '@src/util/iphonex';
export { ListenerId, MutRef } from '@src/util/mutref';


import { PerfTracer as PerfTracerClass } from '@src/util/perf-tracer';

export const PerfTracer = new PerfTracerClass();
export const VuforiaPerfTracer = new PerfTracerClass();

export function isEmptyString(s: string | undefined | null): boolean {
  if (typeof s === 'string') {
    if (s.trim().length > 0) {
      return false;
    }
  }
  return true;
}