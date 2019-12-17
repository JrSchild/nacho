import { Task, TaskIterator } from './common/types';
import { chainTasks, createPipeable } from './common/util';

export const compose = createPipeable(
  (...tasks: Task[]): Task => (startIterator: TaskIterator): TaskIterator =>
    chainTasks(tasks)(startIterator),
);
