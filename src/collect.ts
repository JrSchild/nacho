import { TaskIterable } from './common/types';

export const collect = async <OutContext>(
  iterator: TaskIterable<OutContext>,
): Promise<OutContext[]> => {
  const results: OutContext[] = [];

  // Start pulling all the data and collect the result.
  for await (const result of iterator) {
    results.push(result);
  }

  return results;
};
