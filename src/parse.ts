export function parseQuantity(token: string): number | undefined {
  const parts = token.split("/");
  if (parts.length > 2 || parts.some((part) => part.length === 0)) return undefined;
  const value = parts.length === 2 ? Number(parts[0]) / Number(parts[1]) : Number(token);
  return token.length > 0 && Number.isFinite(value) ? value : undefined;
}
export function parseIngredient(line: string) {
  const words = line.trim().split(" ").filter(Boolean);
  const amount = parseQuantity(words[0] ?? "");
  if (amount === undefined) throw Error("no quantity");
  const unit = ["cups", "cup", "tsp", "piece"].includes(words[1] ?? "") ? words[1] : undefined;
  const name = words.slice(unit === undefined ? 1 : 2).join(" ");
  if (name.length === 0) throw Error("no ingredient name");
  return { amount, unit: unit === "cups" ? "cup" : unit, name };
}
