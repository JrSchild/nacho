import { Pipeable, Task, TaskIterable } from './types';

export const createPipeable = (
  handler: (...tasks: Task[]) => Task,
): Pipeable['handler'] => ({ handler }.handler);

/**
 * Pipes together a list of tasks, starting with an initial iterator.
 */
export const chainTasks = ([firstTask, ...tasks]: Task[]): ((
  startIterator: TaskIterable,
) => TaskIterable) => (startIterator: TaskIterable): TaskIterable =>
  tasks.reduce(
    (previousIterator: TaskIterable, nextTask: Task) =>
      nextTask(previousIterator),
    firstTask(startIterator),
  );
