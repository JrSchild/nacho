import { Task, TaskIterator } from './common/types';
import { chainTasks, createPipeable } from './common/util';
import { collect } from './collect';

export const tryCatch = createPipeable(
  (...tasks: Task[]): Task => (iterator: TaskIterator): TaskIterator => {
    const chain = chainTasks(tasks);

    return {
      async *[Symbol.asyncIterator]() {
        for await (const taskResult of iterator) {
          yield await collect(chain([taskResult]));
        }
      },
    };
  },
);
