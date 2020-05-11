import { immediate } from './timer';

export interface AsyncRunner {
  push(element: string): void;
  test(...elements: string[]): void;
  testNext(...elements: string[]): Promise<void>;
  next(): Promise<void>;
}

export const asyncRunner = (): AsyncRunner => {
  const array: string[] = [];

  return {
    push(element: string): void {
      array.push(element);
    },
    test(...elements: string[]): void {
      expect(array).toStrictEqual(elements);

      array.length = 0;
    },
    async testNext(...elements: string[]): Promise<void> {
      this.test(...elements);

      return await this.next();
    },
    async next(): Promise<void> {
      jest.advanceTimersToNextTimer();

      expect(array).toStrictEqual([]);

      await immediate();
    },
  };
};
