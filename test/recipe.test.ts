import { expect, test } from "bun:test";
import { parseIngredient } from "../src/parse.ts";
import { scaleRecipe } from "../src/scale.ts";
test("parses quantities with and without a unit", () => {
  expect(parseIngredient("2 cups flour")).toEqual({ amount: 2, unit: "cup", name: "flour" });
  expect(parseIngredient("3/4 tsp salt")).toEqual({ amount: 0.75, unit: "tsp", name: "salt" });
  expect(parseIngredient("3 eggs")).toEqual({ amount: 3, unit: undefined, name: "eggs" });
});
test("scales proportional amounts including eggs", () => {
  expect(scaleRecipe(3, 4, 6)).toBe(4.5);
  expect(scaleRecipe(2, 4, 6)).toBe(3);
});
