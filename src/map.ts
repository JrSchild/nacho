import { Task, TaskIterable } from './common/types';

export const map = <InContext, OutContext>(
  handle: (context: InContext) => Promise<OutContext> | OutContext,
): Task<InContext, OutContext> => (
  previousIterator: TaskIterable<InContext>,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      yield await handle(taskResult);
    }
  },
});
