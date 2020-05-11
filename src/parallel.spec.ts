import { parallel } from './parallel';
import { asyncRunner } from '../test/utilities/asyncRunner';
import { asyncGenerateValues } from '../test/utilities/mocks';
import { delay } from '../test/utilities/timer';

it('pulls asynchronously and processes up to a limit concurrency', async (): Promise<void> => {
  jest.useFakeTimers();

  const runner = asyncRunner();

  const parallelIterable = parallel(
    4,
    async (value: number): Promise<number> => {
      runner.push(`handler:before:delay:${value}`);
      await delay(5000);

      runner.push(`handler:before:return:${value}`);
      return value;
    },
  )(asyncGenerateValues(runner, 5));

  const runPromise = runner.run(parallelIterable);

  await runner.testNext('generator:before:delay:0');
  await runner.testNext(
    'generator:before:yield:0',
    'generator:before:delay:1',
    'handler:before:delay:0',
  );
  await runner.testNext(
    'generator:before:yield:1',
    'generator:before:delay:2',
    'handler:before:delay:1',
  );
  await runner.testNext(
    'generator:before:yield:2',
    'generator:before:delay:3',
    'handler:before:delay:2',
  );
  await runner.testNext(
    'handler:before:return:0',
    'result:0',
  );
  await runner.testNext(
    'generator:before:yield:3',
    'generator:before:delay:4',
    'handler:before:delay:3',
  );
  await runner.testNext(
    'handler:before:return:1',
    'result:1',
  );
  await runner.testNext(
    'generator:before:yield:4',
    'handler:before:delay:4',
  );
  await runner.testNext(
    'handler:before:return:2',
    'result:2',
  );
  await runner.testNext(
    'handler:before:return:3',
    'result:3',
  );
  await runner.testNext(
    'handler:before:return:4',
    'result:4',
  );
  await runPromise;
});
