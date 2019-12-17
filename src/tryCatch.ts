import { Task, TaskIterable } from './common/types';
import { chainTasks, createPipeable } from './common/util';
import { collect } from './collect';
import { flatten } from './flatten';

export const tryCatch = createPipeable(
  (...tasks: Task[]): Task => (iterator: TaskIterable): TaskIterable => {
    const chain = chainTasks(tasks);

    return {
      async *[Symbol.asyncIterator]() {
        for await (const taskResult of iterator) {
          // @ts-ignore
          yield await collect(flatten()(chain([taskResult])));
        }
      },
    };
  },
);
