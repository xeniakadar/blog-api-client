import createPreview from "./createPreview";

test('creates preview in correct forma', () => {
  const inputText = "The Bahamas, officially the Commonwealth of The Bahamas,[12] is an island country within the Lucayan Archipelago of the West Indies in the North Atlantic. It takes up 97% of the Lucayan Archipelago's land area and";
  const output = createPreview(inputText);
  expect(output).toBe("The Bahamas, officially the Commonwealth of The Bahamas,[12] is an island country within the Lucayan Archipelago of the West Indies in the North Atlantic. It takes up 97% of the Lucayan Archipelago's land area...")
});
