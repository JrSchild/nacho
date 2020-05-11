import { parallel } from './parallel';

const delay = (delay: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), delay));

export const ticks = async (amount: number): Promise<void> => {
  for (let i = 0; i < amount - 1; i++) {
    await void 0;
  }
};

export const nextTimer = async () => {
  jest.advanceTimersToNextTimer();
  await void 0;
};

// jest.setTimeout(600000);
jest.setTimeout(3000);

it.skip('performs magic', async (): Promise<void> => {
  async function* iterable(): AsyncIterable<number> {
    for (let value = 1; value < 51; value++) {
      // await delay(100);
      console.log(`yielding ${value}`);

      yield value;
    }
  }

  const parallelIterable = parallel(
    5,
    async (value: number): Promise<number> => {
      console.log(`paralleling ${value}`);

      await delay(250);
      return value;
    },
  )(iterable());

  for await (const value of parallelIterable) {
    console.log(`pulled ${value}`);
  }
});

it.skip('performs magic', async (): Promise<void> => {
  jest.useFakeTimers();

  const iteratorCallback = jest.fn();
  const beforeYieldCallback = jest.fn();
  const parallelCallback = jest.fn();
  const beforeParallelReturnCallback = jest.fn();

  async function* iterable(): AsyncIterable<number> {
    for (const value of [1, 2, 3, 4, 5]) {
      console.log('iteratorCallback', value);
      iteratorCallback(value);
      await delay(100);

      console.log('beforeYieldCallback', value);
      beforeYieldCallback(value);
      yield value;
    }
  }

  const parallelIterable = parallel(
    4,
    async (value: number): Promise<number> => {
      console.log('parallelCallback', value);
      parallelCallback(value);
      await delay(250);

      console.log('beforeParallelReturnCallback', value);
      beforeParallelReturnCallback(value);
      return value;
    },
  )(iterable());

  const parallelIterator = parallelIterable[Symbol.asyncIterator]();

  parallelIterator.next();

  await void 0;
  expect(iteratorCallback).toHaveBeenCalledWith(1);
  expect(beforeYieldCallback).not.toHaveBeenCalledWith(1);
  await nextTimer();
  expect(beforeYieldCallback).toHaveBeenCalledWith(1);

  await void 0;
  expect(iteratorCallback).toHaveBeenCalledWith(2);
  expect(beforeYieldCallback).not.toHaveBeenCalledWith(2);
  expect(parallelCallback).not.toHaveBeenCalledWith(1);
  await void 0;
  await void 0;
  await void 0;
  expect(parallelCallback).toHaveBeenCalledWith(1);
  await nextTimer();
  expect(beforeYieldCallback).toHaveBeenCalledWith(2);

  await void 0;
  expect(iteratorCallback).toHaveBeenCalledWith(3);
  await void 0;
  await void 0;
  await void 0;
  expect(parallelCallback).toHaveBeenCalledWith(2);
  await nextTimer();
  expect(beforeYieldCallback).toHaveBeenCalledWith(3);
  expect(iteratorCallback).toHaveBeenCalledWith(4);
  await nextTimer();
  expect(parallelCallback).toHaveBeenCalledWith(3);
  expect(beforeParallelReturnCallback).toHaveBeenCalledWith(1);
});

it('performs magic', async (): Promise<void> => {
  jest.useFakeTimers();

  const calls: string[] = [];

  const matchCalls = (fixture: string[]) => {
    expect(calls).toStrictEqual(fixture);
    calls.length = 0;
  };

  async function* iterable(): AsyncIterable<number> {
    for (const value of [1, 2, 3, 4, 5]) {
      console.log('iteratorCallback', value);
      calls.push(`iteratorCallback:${value}`);
      await delay(100);

      console.log('beforeYieldCallback', value);
      calls.push(`beforeYieldCallback:${value}`);
      yield value;
    }
  }

  const parallelIterable = parallel(
    4,
    async (value: number): Promise<number> => {
      console.log('parallelCallback', value);
      calls.push(`parallelCallback:${value}`);
      await delay(250);

      console.log('beforeParallelReturnCallback', value);
      calls.push(`beforeParallelReturnCallback:${value}`);
      return value;
    },
  )(iterable());

  const parallelIterator = parallelIterable[Symbol.asyncIterator]();

  let nextPromise = parallelIterator.next();

  matchCalls(['iteratorCallback:1']);

  jest.advanceTimersToNextTimer();
  await ticks(6);
  matchCalls([
    'beforeYieldCallback:1',
    'iteratorCallback:2',
    'parallelCallback:1',
  ]);

  jest.advanceTimersToNextTimer();
  await ticks(5);
  matchCalls([
    'beforeYieldCallback:2',
    'iteratorCallback:3',
    'parallelCallback:2',
  ]);

  jest.advanceTimersToNextTimer();
  await ticks(5);
  matchCalls([
    'beforeYieldCallback:3',
    'iteratorCallback:4',
    'parallelCallback:3',
  ]);

  jest.advanceTimersToNextTimer();
  await ticks(1);
  matchCalls(['beforeParallelReturnCallback:1']);

  expect(await nextPromise).toStrictEqual({
    done: false,
    value: 1,
  });

  jest.advanceTimersToNextTimer();
  await ticks(5);
  matchCalls(['beforeYieldCallback:4', 'parallelCallback:4']);

  nextPromise = parallelIterator.next();
  matchCalls(['iteratorCallback:5']);
});
