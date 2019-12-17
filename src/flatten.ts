import { Task, TaskIterable } from './common/types';

export const flatten = <Context>(): Task<Context[], Context> => (
  previousIterator: TaskIterable<Context[]>,
): TaskIterable<Context> => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      for (const element of taskResult) {
        yield element;
      }
    }
  },
});
