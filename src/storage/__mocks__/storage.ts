const storage = {} as any;

let data: Record<string, string> = {};

storage.getItem = jest
  .fn()
  .mockImplementation((key: string) => data[key] ?? null);

storage.setItem = jest.fn().mockImplementation((key: string, item: string) => {
  data[key] = item;
});

storage.clear = jest.fn().mockImplementation(() => {
  storage.getItem.mockClear();
  storage.setItem.mockClear();
  storage.clear.mockClear();

  data = {};
});

module.exports = storage;
