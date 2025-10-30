import type { DataTableHeader } from "carbon-components-svelte/src/DataTable/DataTable.svelte";

/**
 *
 * @param obj Any object, such as a Prisma db model
 * @returns An array of objects with 'key' and 'value' properties.
 */
export function objectToDataTableKeys<T extends object>(
  obj: T,
): DataTableHeader<T>[] {
  const keys = Object.keys(obj);
  // @ts-ignore the typing is too complex
  return keys.map((key) => ({
    key: key as keyof T,
    value: key,
  }));
}
