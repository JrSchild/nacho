import { Task, TaskIterator } from './common/types';
import { chainTasks, createPipeable } from './common/util';

export const compose = createPipeable(
  (...tasks: Task<unknown, unknown>[]): Task<unknown, unknown> => (
    startIterator: TaskIterator<unknown>,
  ): TaskIterator<unknown> => chainTasks(tasks)(startIterator),
);
