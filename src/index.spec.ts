import { collect, compose, map } from './';

const delay = (delay: number) =>
  new Promise(resolve => setTimeout(() => resolve(), delay));

const pipelineSync = compose(
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

const pipelineAsync = compose(
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

describe('Composes functions', () => {
  it('runs a pipeline with synchronous functions', async (): Promise<void> => {
    const resultSync = await collect(pipelineSync([12, 34, 67]));

    expect(resultSync).toMatchObject([
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

  it('runs a pipeline with ssynchronous functions', async (): Promise<void> => {
    const resultAsync = await collect(pipelineAsync([12, 34, 67]));

    expect(resultAsync).toMatchObject([
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
});
