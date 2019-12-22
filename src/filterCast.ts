import { Task, TaskIterator } from './common/types';

export const filterCast = <InContext, OutContext extends InContext>(
  handle: (context: InContext) => context is OutContext,
): Task<InContext, OutContext> => (
  previousIterator: TaskIterator<InContext>,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      if (handle(taskResult)) {
        yield taskResult;
      }
    }
  },
});
