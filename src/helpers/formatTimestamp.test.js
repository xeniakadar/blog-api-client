import { formatTimestamp } from "./formatTimestamp";

test('formats the timestamp correctly', () => {
  const inputTimestamp = new Date("2021-06-10T16:00:00Z");
  const output = formatTimestamp(inputTimestamp);
  expect(output).toBe("2021-06-10");
});
