import { TaskIterable } from './common/types';

/**
 * Process all the data, but does not return them.
 */
export const pull = async (iterator: TaskIterable): Promise<void> => {
  for await (const _ of iterator) {
  }
};
