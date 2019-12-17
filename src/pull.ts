import { TaskIterator } from './common/types';

/**
 * Process all the data, but does not return them.
 */
export const pull = async (iterator: TaskIterator): Promise<void> => {
  for await (const _ of iterator) {
  }
};
