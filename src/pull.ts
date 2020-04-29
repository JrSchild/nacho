import { TaskIterator } from './common/types';

/**
 * Process all the data, but does not return them.
 */
export const pull = async <InContext>(
  iterator: TaskIterator<InContext>,
): Promise<void> => {
  for await (const _ of iterator) {
  }
};
