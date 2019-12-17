import { Task, TaskIterable } from './common/types';
import { chainTasks, createPipeable } from './common/util';

export const compose = createPipeable(
  (...tasks: Task[]): Task => (startIterator: TaskIterable): TaskIterable =>
    chainTasks(tasks)(startIterator),
);
