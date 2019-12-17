export type TaskIterator<Type = unknown> = AsyncIterable<Type> | Iterable<Type>;

export type Task<InContext = unknown, OutContext = unknown> = (
  previousIterator: TaskIterator<InContext>,
) => TaskIterator<OutContext>;

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
  handler<Out0, Out1, Out2, Out3, Out4>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
  ): Task<Out0, Out4>;
  handler<Out0, Out1, Out2, Out3, Out4, Out5>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
    task5: Task<Out4, Out5>,
  ): Task<Out0, Out5>;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
    task5: Task<Out4, Out5>,
    task6: Task<Out5, Out6>,
  ): Task<Out0, Out6>;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
    task5: Task<Out4, Out5>,
    task6: Task<Out5, Out6>,
    task7: Task<Out6, Out7>,
  ): Task<Out0, Out7>;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
    task5: Task<Out4, Out5>,
    task6: Task<Out5, Out6>,
    task7: Task<Out6, Out7>,
    task8: Task<Out7, Out8>,
  ): Task<Out0, Out8>;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8, Out9>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
    task5: Task<Out4, Out5>,
    task6: Task<Out5, Out6>,
    task7: Task<Out6, Out7>,
    task8: Task<Out7, Out8>,
    task9: Task<Out8, Out9>,
  ): Task<Out0, Out9>;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8, Out9, Out10>(
    task1: Task<Out0, Out1>,
    task2: Task<Out1, Out2>,
    task3: Task<Out2, Out3>,
    task4: Task<Out3, Out4>,
    task5: Task<Out4, Out5>,
    task6: Task<Out5, Out6>,
    task7: Task<Out6, Out7>,
    task8: Task<Out7, Out8>,
    task9: Task<Out8, Out9>,
    task10: Task<Out9, Out10>,
  ): Task<Out0, Out10>;
}
