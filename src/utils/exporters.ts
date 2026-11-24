export interface ColorToken {
  id: string;
  name: string;
  value: string;
}

export function exportToCssVariables(tokens: ColorToken[]): string {
  const lines = tokens.map((t) => `  --color-${t.name}: ${t.value};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

export function exportToTailwindConfig(tokens: ColorToken[]): string {
  const entries = tokens.map((t) => `        "${t.name}": "${t.value}",`).join("\n");
  return `export default {\n  theme: {\n    extend: {\n      colors: {\n${entries}\n      }\n    }\n  }\n};`;
}

export function exportToFigmaTokensJson(tokens: ColorToken[]): string {
  const obj: Record<string, { value: string; type: string }> = {};
  for (const t of tokens) {
    obj[t.name] = { value: t.value, type: "color" };
  }
  return JSON.stringify({ global: obj }, null, 2);
}
