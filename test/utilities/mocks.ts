import { AsyncRunner } from './asyncRunner';
import { delay } from './timer';

export async function* asyncGenerateValues(
  runner: AsyncRunner,
  length: number,
): AsyncGenerator<number, any, unknown> {
  for (let i = 0; i < length; i++) {
    runner.push(`generator:before:delay:${i}`);
    await delay(2000);

    runner.push(`generator:before:yield:${i}`);
    yield i;
  }
}
