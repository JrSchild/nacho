import { Pipeable, Task, TaskIterable } from './types';

export const createPipeable = (
  handler: (
    ...tasks: Task<unknown, unknown>[]
  ) => Task<unknown, unknown>,
): Pipeable['handler'] => ({ handler }.handler);

/**
 * Pipes together a list of tasks, starting with an initial iterator.
 */
export const chainTaskIterators = (
  startIterator: TaskIterable<unknown>,
  [firstTask, ...tasks]: Task<unknown, unknown>[],
): TaskIterable<unknown> =>
  tasks.reduce(
    (
      previousIterator: TaskIterable<unknown>,
      nextTask: Task<unknown, unknown>,
    ) => nextTask(previousIterator),
    firstTask(startIterator),
  );
