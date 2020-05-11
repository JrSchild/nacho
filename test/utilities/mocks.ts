import { AsyncRunner } from './asyncRunner';
import { delay } from './timer';

export async function* asyncGenerateValues(
  runner: AsyncRunner,
  length: number,
): AsyncGenerator<number, any, unknown> {
  for (let value = 0; value < length; value++) {
    runner.push(`generator:before:delay:${value}`);
    await delay(2000);

    runner.push(`generator:before:yield:${value}`);
    yield value;
  }
}
