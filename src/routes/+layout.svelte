<script lang="ts">
  import "../app.css";
  import Navbar from "./Navbar.svelte";
  import { ElementSize } from "runed";

  let { children } = $props();

  let navbarCoveringContent = $state(false);
  let navbarElement: HTMLElement | null = $state(null);
  const navbarSize = new ElementSize(() => navbarElement);

  function onScrolled(event: Event) {
    const target = event.target as HTMLElement;
    navbarCoveringContent = target.scrollTop > 0;
  }
</script>

<div
  class="relative flex h-dvh flex-col overflow-y-auto"
  onscroll={onScrolled}
  style="scroll-padding-top: {navbarSize.height}px;"
>
  <div class="sticky top-0 z-50" bind:this={navbarElement}>
    <Navbar coveringContent={navbarCoveringContent} />
  </div>
  <div class="absolute w-full max-w-[100rem] grow self-center px-4" style="padding-top: {navbarSize.height}px;">
    {@render children()}
  </div>
</div>
