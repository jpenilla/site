// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { CacheStorage, ExecutionContext, IncomingRequestCfProperties } from "@cloudflare/workers-types";

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env: unknown;
      ctx: ExecutionContext;
      context: ExecutionContext;
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
    }
  }
}

export {};
