import { Task, TaskIterator } from './common/types';

export const filter = <InContext>(
  handle: (context: InContext) => boolean,
): Task<InContext, InContext> => (
  previousIterator: TaskIterator<InContext>,
) => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      if (handle(taskResult) === true) {
        yield taskResult;
      }
    }
  },
});
