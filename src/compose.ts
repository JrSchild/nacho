import { Task, TaskIterable } from './common/types';
import { chainTaskIterators, createPipeable } from './common/util';

export const compose = createPipeable(
  (...tasks: Task<unknown, unknown>[]): Task<unknown, unknown> => (
    startIterator: TaskIterable<unknown>,
  ): TaskIterable<unknown> => chainTaskIterators(startIterator, tasks),
);
