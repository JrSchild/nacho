import { Task, TaskIterator } from './common/types';

export const map = <InContext, OutContext>(
  handle: (context: InContext) => Promise<OutContext> | OutContext,
): Task<InContext, OutContext> => (
  previousIterator: TaskIterator<InContext>,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      yield await handle(taskResult);
    }
  },
});
