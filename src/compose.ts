import { Task, TaskIterable } from './common/types';
import { chainTaskIterators, createPipeable } from './common/util';

export const compose = createPipeable(
  (...tasks: Task[]): Task => (startIterator: TaskIterable): TaskIterable =>
    chainTaskIterators(startIterator, tasks),
);
