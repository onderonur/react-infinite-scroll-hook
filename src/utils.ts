import { NullOrUndefined } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNullOrUndefined(value: any): value is NullOrUndefined {
  return [null, undefined].includes(value);
}
