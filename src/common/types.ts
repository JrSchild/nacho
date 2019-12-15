export type TaskIterable<Type> = AsyncIterable<Type> | Iterable<Type>;

export type TaskRunner<InContext, OutContext> = {
  run: (elements: InContext[]) => Promise<OutContext[]>;
};

export type TaskElement<InContext, OutContext> = {
  pipe: (previousIterator: TaskIterable<InContext>) => TaskIterable<OutContext>;
};

export interface Pipeable {
  handler<Out0, Out1>(task1: TaskElement<Out0, Out1>): TaskRunner<Out0, Out1>;
  handler<Out0, Out1, Out2>(
    task1: TaskElement<Out0, Out1>,
    task2: TaskElement<Out1, Out2>,
  ): TaskRunner<Out0, Out2>;
  handler<Out0, Out1, Out2, Out3>(
    task1: TaskElement<Out0, Out1>,
    task2: TaskElement<Out1, Out2>,
    task3: TaskElement<Out2, Out3>,
  ): TaskRunner<Out0, Out3>;
}
