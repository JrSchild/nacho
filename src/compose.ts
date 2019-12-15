import { TaskElement, TaskRunner } from './common/types';
import { chainTaskIterators, createPipeable } from './common/util';

export const compose = createPipeable(
  (...tasks: TaskElement<unknown, unknown>[]): TaskRunner<unknown, unknown> => ({
    run: async (elements: unknown[]) => {
      const lastIterator = chainTaskIterators(elements, tasks);
      const results: unknown[] = [];

      // Start pulling all the data and collect the result.
      for await (const result of lastIterator) {
        results.push(result);
      }

      return results;
    },
  }),
);
