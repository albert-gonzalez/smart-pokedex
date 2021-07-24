const debounce = jest.fn().mockImplementation((callback) => {
  return (...args: any[]) => {
    return callback(...args);
  };
});

export default debounce;
