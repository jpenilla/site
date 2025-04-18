<script lang="ts">
  import "../app.css";
  import Navbar from "./Navbar.svelte";
  import { ElementSize, useEventListener } from "runed";
  import { RootContext, rootContext } from "$lib/context.svelte";

  let { children } = $props();

  let navbarCoveringContent = $state(false);
  let navbarElement: HTMLElement | null = $state(null);
  const navbarSize = new ElementSize(() => navbarElement);
  rootContext.set(new RootContext(() => navbarSize.height));

  function onScrolled() {
    let scrollY = Math.floor(window.scrollY);
    if (scrollY == 1) {
      // Fix mobile safari oddity with overscroll bounceback
      // The scroll position would end up at 1 rather than zero when scrolling on a page that fits in the viewport
      scrollY = 0;
      window.scroll({ top: 0, behavior: "auto" });
    }
    navbarCoveringContent = scrollY > 0;
  }

  useEventListener(() => document, "scroll", onScrolled);
  useEventListener(() => document, "scrollend", onScrolled);
  useEventListener(() => document, "resize", onScrolled);
</script>

<div class="relative flex flex-col">
  <header class="sticky top-0 left-0 z-50 w-full" bind:this={navbarElement}>
    <Navbar coveringContent={navbarCoveringContent} />
  </header>
  <div class="w-full max-w-[100rem] grow self-center px-4">
    {@render children()}
  </div>
</div>
