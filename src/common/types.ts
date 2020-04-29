export type TaskIterator<Type> = AsyncIterable<Type> | Iterable<Type>;

export type Task<InContext, OutContext> = (
  previousIterator: TaskIterator<InContext>,
) => TaskIterator<OutContext>;

export interface Pipeable {
  handler<Out0, Out1>(task1: (param: Out0) => Out1): (param: Out0) => Out1;
  handler<Out0, Out1, Out2>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
  ): (param: Out0) => Out2;
  handler<Out0, Out1, Out2>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
  ): (param: Out0) => Out1;
  handler<Out0, Out1, Out2, Out3>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
  ): (param: Out0) => Out3;
  handler<Out0, Out1, Out2, Out3, Out4>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
  ): (param: Out0) => Out4;
  handler<Out0, Out1, Out2, Out3, Out4, Out5>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
    task5: (param: Out4) => Out5,
  ): (param: Out0) => Out5;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
    task5: (param: Out4) => Out5,
    task6: (param: Out5) => Out6,
  ): (param: Out0) => Out6;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
    task5: (param: Out4) => Out5,
    task6: (param: Out5) => Out6,
    task7: (param: Out6) => Out7,
  ): (param: Out0) => Out7;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
    task5: (param: Out4) => Out5,
    task6: (param: Out5) => Out6,
    task7: (param: Out6) => Out7,
    task8: (param: Out7) => Out8,
  ): (param: Out0) => Out8;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8, Out9>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
    task5: (param: Out4) => Out5,
    task6: (param: Out5) => Out6,
    task7: (param: Out6) => Out7,
    task8: (param: Out7) => Out8,
    task9: (param: Out8) => Out9,
  ): (param: Out0) => Out9;
  handler<Out0, Out1, Out2, Out3, Out4, Out5, Out6, Out7, Out8, Out9, Out10>(
    task1: (param: Out0) => Out1,
    task2: (param: Out1) => Out2,
    task3: (param: Out2) => Out3,
    task4: (param: Out3) => Out4,
    task5: (param: Out4) => Out5,
    task6: (param: Out5) => Out6,
    task7: (param: Out6) => Out7,
    task8: (param: Out7) => Out8,
    task9: (param: Out8) => Out9,
    task10: (param: Out9) => Out10,
  ): (param: Out0) => Out10;
}
