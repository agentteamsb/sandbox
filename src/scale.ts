export function scaleRecipe(amount: number, oldServings: number, newServings: number): number {
  return amount * newServings / oldServings;
}
