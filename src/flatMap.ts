import { Task, TaskIterable } from './common/types';

export const flatMap = <InContext, OutContext>(
  handle: (context: InContext) => Promise<OutContext> | OutContext,
): Task<InContext[], OutContext> => (
  previousIterator: TaskIterable<InContext[]>,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      for (const element of taskResult) {
        yield await handle(element);
      }
    }
  },
});
