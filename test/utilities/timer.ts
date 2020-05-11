export const delay = (delay: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), delay));

const realSetImmediate = global.setImmediate;

export const immediate = () =>
  new Promise(resolve => realSetImmediate(() => resolve()));
