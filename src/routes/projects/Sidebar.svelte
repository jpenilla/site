<script lang="ts">
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import { ScrollArea } from "bits-ui";
  import { MediaQuery } from "svelte/reactivity";
  import { onClickOutside } from "runed";

  interface SidebarProps {
    sidebarVisible: boolean;
  }

  let { sidebarVisible = $bindable() }: SidebarProps = $props();

  const rootCtx = rootContext.get();

  const twSm = new MediaQuery("(width >= 40rem)");
  let sidebarVisibleEffective = $derived(twSm.current || sidebarVisible);
  let viewportElement: HTMLElement | null = $state(null);
  let scrollbarElement: HTMLElement | null = $state(null);
  onClickOutside(
    () => viewportElement,
    (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-sidebar-toggle]")) {
        return;
      }
      if (scrollbarElement && scrollbarElement.contains(e.target as Node)) {
        return;
      }
      hideSidebar();
    },
  );

  function hideSidebar() {
    sidebarVisible = false;
  }
</script>

<!-- TODO: menu tabbable while not visible -->
<div
  class="pointer-events-none fixed z-50 shrink-0 -translate-x-0 transition duration-150 ease-in-out data-[sidebar-visible=false]:-translate-x-[110%] sm:sticky data-[sidebar-visible=false]:sm:translate-x-0"
  style="height: calc(100dvh - {rootCtx.navbarHeight + 32}px); top: {rootCtx.navbarHeight + 8}px;"
  data-sidebar-visible={sidebarVisibleEffective}
>
  <div class="flex size-full flex-col pt-10 transition duration-150 ease-in-out sm:pt-0">
    <ScrollArea.Root class="pointer-events-auto grow overflow-hidden " type="auto">
      <ScrollArea.Viewport
        class="h-full max-h-max rounded-box border border-base-300 bg-base-200/80 backdrop-blur duration-150 ease-in-out sm:border-0 sm:bg-base-200 sm:backdrop-blur-none"
        bind:ref={viewportElement}
      >
        <ul class="menu menu-vertical w-max p-2">
          {#each projectGroups as group (group.id)}
            <li>
              <a class="font-semibold" href="#{group.id}" onclick={hideSidebar}>{group.name}</a>
              <ul>
                {#each group.projects as project (project.name)}
                  <li><a href="#{project.id}" onclick={hideSidebar}>{project.name}</a></li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        class="m-1 flex w-1.5 touch-none rounded-md border-l border-l-transparent transition-all duration-150 select-none hover:w-2.5 hover:bg-base-300 [&:has(:active)]:w-2.5 [&:has(:active)]:bg-base-300"
        bind:ref={scrollbarElement}
      >
        <ScrollArea.Thumb forceMount class="flex-1 rounded-md bg-base-content/50 transition-colors active:bg-primary" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  </div>
</div>
