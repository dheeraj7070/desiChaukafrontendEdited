// import { FilterField, Get } from "@/types/filters";

// export const fieldParams = (f: FilterField): string[] =>
//   f.type === "select" ? [f.param] : [f.minParam, f.maxParam];

// export function isFieldActive(f: FilterField, get: Get): boolean {
//   if (f.type === "select") {
//     const v = get(f.param);
//     return v !== null && v !== f.defaultValue && f.options.some((o) => o.value === v);
//   }
//   return Boolean(get(f.minParam) || get(f.maxParam));
// }

// export function describeField(f: FilterField, get: Get): string {
//   if (f.type === "select") {
//     const v = get(f.param);
//     return `${f.label}: ${f.options.find((o) => o.value === v)?.label ?? v}`;
//   }
//   const min = get(f.minParam);
//   const max = get(f.maxParam);
//   const p = f.prefix ?? "";
//   if (min && max) return `${f.label}: ${p}${min} – ${p}${max}`;
//   if (min) return `${f.label}: ${p}${min}+`;
//   return `${f.label}: up to ${p}${max}`;
// }