import { asyncRunner } from '../test/utilities/asyncRunner';
import { asyncGenerateValues } from '../test/utilities/mocks';
import { delay } from '../test/utilities/timer';
import { collect, map } from './';

// @ts-ignore
jest.useFakeTimers('modern');

// TODO: May want to test intermediary return types.
it('magic', async (): Promise<void> => {
  const runner = asyncRunner();

  const pipe = map(async (value: number) => {
    runner.push(`handler:before:delay:${value}`);
    await delay(1000);

    runner.push(`handler:before:return:${value}`);
    return value * 2;
  })(asyncGenerateValues(runner, 2));

  const collectPromise = collect(pipe);

  await runner.testNext('generator:before:delay:0');
  await runner.testNext('generator:before:yield:0', 'handler:before:delay:0');
  await runner.testNext('handler:before:return:0', 'generator:before:delay:1');
  await runner.testNext('generator:before:yield:1', 'handler:before:delay:1');
  runner.test('handler:before:return:1');

  await collectPromise;
});
