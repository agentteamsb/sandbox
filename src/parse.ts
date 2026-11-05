export function parseQuantity(token: string): number | undefined {
  const parts = token.split("/");
  if (parts.length > 2 || parts.some((part) => part.length === 0)) return undefined;
  const value = parts.length === 2 ? Number(parts[0]) / Number(parts[1]) : Number(token);
  return token.length > 0 && Number.isFinite(value) ? value : undefined;
}
export function parseIngredient(line: string) {
  const words = line.trim().split(" ").filter(Boolean);
  const whole = parseQuantity(words[0] ?? "");
  if (whole === undefined) throw Error("no quantity");
  const fraction = Number.isInteger(whole) && (words[1] ?? "").includes("/") ? parseQuantity(words[1] ?? "") : undefined;
  const amount = whole + (fraction ?? 0);
  const unitAt = fraction === undefined ? 1 : 2;
  if (amount === undefined) throw Error("no quantity");
  const unit = ["cups", "cup", "tsp", "piece"].includes(words[unitAt] ?? "") ? words[unitAt] : undefined;
  const name = words.slice(unit === undefined ? 1 : unitAt + 1).join(" ");
  if (name.length === 0) throw Error("no ingredient name");
  return { amount, unit: unit === "cups" ? "cup" : unit, name };
}
