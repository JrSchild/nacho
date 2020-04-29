import { Pipeable, Task, TaskIterator } from './types';

export const createPipeable = (
  handler: (...tasks: Task<unknown, unknown>[]) => Task<unknown, unknown>,
): Pipeable['handler'] => ({ handler }.handler);

/**
 * Pipes together a list of tasks, starting with an initial iterator.
 */
export const chainTasks = ([firstTask, ...tasks]: Task<unknown, unknown>[]): ((
  startIterator: TaskIterator<unknown>,
) => TaskIterator<unknown>) => (
  startIterator: TaskIterator<unknown>,
): TaskIterator<unknown> =>
  tasks.reduce(
    (
      previousIterator: TaskIterator<unknown>,
      nextTask: Task<unknown, unknown>,
    ) => nextTask(previousIterator),
    firstTask(startIterator),
  );
