import { Task, TaskIterator } from './common/types';

export const tap = <Context>(
  handle: (context: Context) => Promise<unknown> | unknown,
): Task<Context, Context> => (
  previousIterator: TaskIterator<Context>,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      await handle(taskResult);

      yield taskResult;
    }
  },
});
