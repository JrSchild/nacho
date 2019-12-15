import { TaskElement, TaskIterable } from "./common/types";

/**
 * Returns an iterator that consumes the previousIterator and process each
 * element asynchronously with the handle. One by one.
 */
const makeAsyncIterable = <InContext, OutContext>(
  handle: (context: InContext) => Promise<OutContext> | OutContext,
): ((
  previousIterator: TaskIterable<InContext>,
) => TaskIterable<OutContext>) => (
  previousIterator: TaskIterable<InContext>,
): TaskIterable<OutContext> => ({
  async *[Symbol.asyncIterator]() {
    for await (const taskResult of previousIterator) {
      yield await handle(taskResult);
    }
  },
});

export const map = <InContext, OutContext>(
  handle: (context: InContext) => Promise<OutContext> | OutContext,
): TaskElement<InContext, OutContext> => ({
  pipe: makeAsyncIterable(handle),
});
