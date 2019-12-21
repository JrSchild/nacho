import {
  collect,
  compose,
  filter,
  filterCast,
  flatMap,
  flatten,
  map,
} from './';

const delay = (delay: number) =>
  new Promise(resolve => setTimeout(() => resolve(), delay));

describe('Composes functions', () => {
  it('runs a pipeline of synchronous map functions', async (): Promise<
    void
  > => {
    const pipeline = compose(
      map((context: number) => ({
        greeting: 'Hello',
        name: 'Thomas',
        hi: context,
      })),
      map(context => ({
        clean: `${context.greeting} ${context.name}`,
        hi: context.hi,
      })),
      map(context => ({
        clean: `${context.clean} ${context.clean}`,
        yolo: context.hi,
      })),
    );

    const result = await collect(pipeline([12, 34, 67]));

    expect(result).toMatchObject([
      {
        clean: 'Hello Thomas Hello Thomas',
        yolo: 12,
      },
      {
        clean: 'Hello Thomas Hello Thomas',
        yolo: 34,
      },
      {
        clean: 'Hello Thomas Hello Thomas',
        yolo: 67,
      },
    ]);
  });

  it('runs a pipeline of asynchronous map functions', async (): Promise<
    void
  > => {
    const pipeline = compose(
      map(async (context: number) => {
        console.log(context);
        await delay(100);

        return {
          greeting: 'Hello',
          name: 'Thomas',
          hi: context,
        };
      }),
      map(async ({ greeting, name, hi }) => {
        console.log(hi);
        await delay(100);

        return {
          clean: `${greeting} ${name}`,
          hi,
        };
      }),
      map(async context => {
        console.log(context.hi);
        await delay(100);

        return {
          cleanLength: context.clean.length,
          clean: context.clean,
          hi: context.hi,
        };
      }),
    );

    const result = await collect(pipeline([12, 34, 67]));

    expect(result).toMatchObject([
      {
        clean: 'Hello Thomas',
        cleanLength: 12,
        hi: 12,
      },
      {
        clean: 'Hello Thomas',
        cleanLength: 12,
        hi: 34,
      },
      {
        clean: 'Hello Thomas',
        cleanLength: 12,
        hi: 67,
      },
    ]);
  });

  it('flattens the elements', async (): Promise<void> => {
    const pipeline = compose(
      map((context: number) => [context + 1, context + 2, context + 3]),
      flatten(),
      map(number => ({ number })),
    );

    const result = await collect(pipeline([12, 34, 67]));

    expect(result).toMatchObject([
      { number: 13 },
      { number: 14 },
      { number: 15 },
      { number: 35 },
      { number: 36 },
      { number: 37 },
      { number: 68 },
      { number: 69 },
      { number: 70 },
    ]);
  });

  it('flatMaps the elements', async (): Promise<void> => {
    const pipeline = compose(
      map((context: number) => [context + 1, context + 2, context + 3]),
      flatMap(number => ({ number })),
    );

    const result = await collect(pipeline([12, 34, 67]));

    expect(result).toMatchObject([
      { number: 13 },
      { number: 14 },
      { number: 15 },
      { number: 35 },
      { number: 36 },
      { number: 37 },
      { number: 68 },
      { number: 69 },
      { number: 70 },
    ]);
  });

  it('filters the elements', async (): Promise<void> => {
    const input = [12, 34, 67];

    const result = await collect(
      filter((context: number) => context > 15)(input),
    );

    expect(result).toMatchObject([34, 67]);
  });

  it('filters the elements and casts them', async (): Promise<void> => {
    interface SomeType {
      value: number;
    }

    const pipeline = compose(
      filterCast(
        (context: number | SomeType): context is SomeType =>
          typeof context !== 'number',
      ),
      map(context => context.value),
    );

    const result = await collect(pipeline([12, { value: 78 }, 67]));

    expect(result).toMatchObject([78]);
  });
});
