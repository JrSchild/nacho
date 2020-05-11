import { TaskIterator } from './common/types';

const isSynchronousIterator = <Type>(
  iterator: Iterable<Type> | AsyncIterable<Type>,
): iterator is Iterable<Type> => iterator[Symbol.iterator] !== undefined;

const isAsynchronousIterator = <Type>(
  iterator: Iterable<Type> | AsyncIterable<Type>,
): iterator is AsyncIterable<Type> =>
  iterator[Symbol.asyncIterator] !== undefined;

/**
 * Returns the type while removing the optional typing. Throws if is not
 * defined.
 */
export const assertIsDefined = <Type>(
  value: Type | null | undefined,
): Type => {
  if (value === null || value === undefined) {
    throw new Error('Value is not defined');
  }

  return value;
};

type AsyncNext<InContext> = () => Promise<IteratorResult<InContext>>;

/**
 * From a small test it seems that this function is redundant, as continuously
 * invoking .next() on an async iterator will already be chained.
 */
const makeAsyncNext = <InContext>(
  iterable: AsyncIterable<InContext>
) => {
  const iterator = iterable[Symbol.asyncIterator]();

  let previousNextPromise: Promise<unknown> = Promise.resolve();

  return async (): ReturnType<AsyncNext<InContext>> => {
    const previousNextPromiseReference = previousNextPromise;
    const nextPromise = iterator.next();

    previousNextPromise = nextPromise;
  
    await previousNextPromiseReference;
  
    return nextPromise;
  };
};

type ParallelTask<InContext, OutContext> = (
  previousIterator: TaskIterator<InContext>,
) => AsyncIterable<OutContext>;

export const parallel = <InContext, OutContext>(
  limit: number,
  handle: (context: InContext) => Promise<OutContext>, // | OutContext,
): ParallelTask<InContext, OutContext> => (
  previousIterator: TaskIterator<InContext>,
): AsyncIterable<OutContext> => {
  if (isSynchronousIterator(previousIterator)) {
    throw new TypeError('Synchronous iterators not yet implemented.');
  }

  if (isAsynchronousIterator(previousIterator) === false) {
    throw new TypeError('Iterator must be asynchronous.');
  }

  const buffer: Promise<IteratorResult<OutContext>>[] = [];

  const pull = async (next: AsyncNext<InContext>): Promise<IteratorResult<OutContext, null>> => {
    const result = await next();

    return result.done ? {
      done: true,
      value: null,
    } : {
      done: false,
      value: await handle(result.value),
    };
  };

  return {
    async *[Symbol.asyncIterator]() {
      const asyncNext = makeAsyncNext(previousIterator);

      for (let i = 0; i < limit; i++) {
        buffer.push(pull(asyncNext));
      }

      while (true) {
        const nextResult = await assertIsDefined(buffer.shift());

        if (nextResult.done) {
          break;
        }

        yield await nextResult.value;

        buffer.push(pull(asyncNext));
      }
    },
  };
};
