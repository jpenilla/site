<script lang="ts">
  import "../app.css";
  import Navbar from "./Navbar.svelte";
  import { ElementSize } from "runed";
  import { RootContext, rootContext } from "$lib/context.svelte";
  import { ScrollPos } from "$lib/scroll-watcher.svelte";

  let { children } = $props();

  let navbarElement: HTMLElement | null = $state(null);
  const navbarSize = new ElementSize(() => navbarElement);
  rootContext.set(new RootContext(() => navbarSize.height));
  const rootCtx = rootContext.get();

  const windowScrollPos = new ScrollPos(() => window);
  $effect(() => {
    rootCtx.updateContentUnderNavbar("body", windowScrollPos.scrollY > 0);
  });
</script>

<div class="relative flex flex-col">
  <header class="sticky top-0 left-0 z-100 w-full" bind:this={navbarElement}>
    <Navbar coveringContent={rootCtx.isContentUnderNavbar} />
  </header>
  <div class="w-full max-w-[100rem] grow self-center px-4">
    {@render children()}
  </div>
</div>
