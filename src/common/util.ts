import {
  Pipeable,
  TaskElement,
  TaskIterable,
  TaskRunner,
} from './types';

export const createPipeable = (
  handler: (...tasks: TaskElement<unknown, unknown>[]) => TaskRunner<unknown, unknown>,
): Pipeable['handler'] => ({ handler }).handler;

/**
 * Pipes together a list of tasks, starting with an initial iterator.
 */
export const chainTaskIterators = (
  startIterator: TaskIterable<unknown>,
  tasks: TaskElement<unknown, unknown>[],
): TaskIterable<unknown> =>
  tasks.reduce(
    (
      previousIterator: TaskIterable<unknown>,
      nextTask: TaskElement<unknown, unknown>,
    ) => nextTask.pipe(previousIterator),
    startIterator,
  );
