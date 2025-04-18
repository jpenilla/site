<script lang="ts">
  import "../app.css";
  import Navbar from "./Navbar.svelte";
  import { ElementSize } from "runed";
  import { onMount } from "svelte";
  import { on } from "svelte/events";
  import { RootContext, rootContext } from "$lib/context.svelte";

  let { children } = $props();

  let navbarCoveringContent = $state(false);
  let navbarElement: HTMLElement | null = $state(null);
  const navbarSize = new ElementSize(() => navbarElement);
  rootContext.set(new RootContext(() => navbarSize.height));

  function onScrolled() {
    navbarCoveringContent = window.scrollY > 0;
  }
  onMount(() => {
    const remove = on(document, "scroll", onScrolled);
    return () => {
      remove();
    };
  });
</script>

<div class="relative flex flex-col" style="scroll-margin-top: calc(4rem + {navbarSize.height}px);">
  <header class="sticky top-0 left-0 z-50 w-full" bind:this={navbarElement}>
    <Navbar coveringContent={navbarCoveringContent} />
  </header>
  <div class="w-full max-w-[100rem] grow self-center px-4">
    {@render children()}
  </div>
</div>
