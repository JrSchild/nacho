import { Pipeable, Task, TaskIterator } from './types';

export const createPipeable = (
  handler: (...tasks: Task[]) => Task,
): Pipeable['handler'] => ({ handler }.handler);

/**
 * Pipes together a list of tasks, starting with an initial iterator.
 */
export const chainTasks = ([firstTask, ...tasks]: Task[]): ((
  startIterator: TaskIterator,
) => TaskIterator) => (startIterator: TaskIterator): TaskIterator =>
  tasks.reduce(
    (previousIterator: TaskIterator, nextTask: Task) =>
      nextTask(previousIterator),
    firstTask(startIterator),
  );
