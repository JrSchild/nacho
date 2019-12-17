export type TaskIterable<Type = unknown> = AsyncIterable<Type> | Iterable<Type>;

export type Task<InContext = unknown, OutContext = unknown> = (
  previousIterator: TaskIterable<InContext>,
) => TaskIterable<OutContext>;

export interface Pipeable {
  handler<Out0, Out1>(task1: Task<Out0, Out1>): Task<Out0, Out1>;
  handler<Out0, Out1, Out2>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
  ): Task<Out0, Out2>;
  handler<Out0, Out1, Out2, Out3>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
  ): Task<Out0, Out3>;
}
