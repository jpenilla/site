import { type Component, tick } from "svelte";

export function withViewTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(async () => {
      callback();
      await tick();
    });
  } else {
    callback();
  }
}

export interface MetadataMapper<R> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (metadata: Record<string, any>, component: Component): R;
}

export function withMetadata<R>(imports: Record<string, unknown>, map: MetadataMapper<R>, order: string[] = []) {
  return groupWithMetadata(imports, null, map, order);
}

export function groupWithMetadata<R>(
  imports: Record<string, unknown>,
  path: string | null,
  map: MetadataMapper<R>,
  order: string[] = [],
): R[] {
  const importsMap = new Map<string, unknown>();
  for (const filePath of Object.keys(imports)) {
    const search = path === null ? "/" : `/${path}/`;
    const idx = filePath.lastIndexOf(search);
    if (idx === -1) continue;
    const slug = filePath.slice(idx + search.length, filePath.length - 4);
    importsMap.set(slug, imports[filePath]);
  }

  const ret: R[] = [];

  for (const string of order) {
    const entry = importsMap.get(string);
    if (entry) {
      importsMap.delete(string);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ret.push(map(entry.metadata, entry.default));
    }
  }
  for (const entry of importsMap.values()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ret.push(map(entry.metadata, entry.default));
  }

  return ret;
}
