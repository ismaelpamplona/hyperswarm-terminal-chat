test("Basic Jest test to verify setup", () => {
  const sum = (a, b) => a + b;
  expect(sum(2, 3)).toBe(5);
});
