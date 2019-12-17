import { Task, TaskIterator } from './common/types';

export const flatten = <Context>(): Task<Context[], Context> => (
  previousIterator: TaskIterator<Context[]>,
): TaskIterator<Context> => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      for (const element of taskResult) {
        yield element;
      }
    }
  },
});
