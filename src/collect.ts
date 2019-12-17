import { TaskIterator } from './common/types';

export const collect = async <OutContext>(
  taskIterator: TaskIterator<OutContext>,
): Promise<OutContext[]> => {
  const taskResults: OutContext[] = [];

  // Start pulling all the data and collect the result.
  for await (const taskResult of taskIterator) {
    taskResults.push(taskResult);
  }

  return taskResults;
};
