<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import { onClickOutside } from "runed";
  import { ScrollArea } from "bits-ui";
  import { MediaQuery } from "svelte/reactivity";

  const rootCtx = rootContext.get();
  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootCtx.navbarHeight}px);`);

  let sidebarVisible = $state(false);
  const twSm = new MediaQuery("(width >= 40rem)");
  let sidebarVisibleEffecitve = $derived(twSm.current || sidebarVisible);
  let sidebarElement: HTMLElement | null = $state(null);
  onClickOutside(
    () => sidebarElement,
    (e) => {
      if (e.target instanceof HTMLElement && e.target.closest("[data-sidebar-toggle]")) {
        return;
      }
      hideSidebar();
    },
  );

  function hideSidebar() {
    sidebarVisible = false;
  }
</script>

<svelte:head>
  <title>Jason Penilla - Projects</title>
</svelte:head>

{#snippet pageContent()}
  {#each projectGroups as group (group.id)}
    <a href="#{group.id}" class="btn mb-2 btn-ghost">
      <h2 id={group.id} class="flex items-center gap-1 text-xl" style={scrollMarginStyle}>
        <span class="iconify size-6 {group.iconClasses}"></span>{group.name}
      </h2>
    </a>
    <div class="mb-6 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {#each group.projects as project (project.name)}
        <ProjectCard {project} style={scrollMarginStyle} />
      {/each}
    </div>
  {/each}
{/snippet}

{#snippet sidebar()}
  <div
    class="pointer-events-none fixed z-50 shrink-0 -translate-x-0 transition duration-150 ease-in-out data-[sidebar-visible=false]:-translate-x-[110%] sm:sticky"
    style="height: calc(100dvh - {rootCtx.navbarHeight + 36}px); top: {rootCtx.navbarHeight + 8}px;"
    data-sidebar-visible={sidebarVisibleEffecitve}
  >
    <div class="flex size-full flex-col pt-10 transition duration-150 ease-in-out sm:pt-0" bind:this={sidebarElement}>
      <ScrollArea.Root class="pointer-events-auto grow overflow-hidden " type="auto">
        <ScrollArea.Viewport
          class="h-full max-h-max rounded-box border border-base-300 bg-base-200/80 backdrop-blur duration-150 ease-in-out sm:border-0 sm:bg-base-200 sm:backdrop-blur-none"
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
        >
          <ScrollArea.Thumb
            forceMount
            class="flex-1 rounded-md bg-base-content/50 transition-colors active:bg-primary"
          />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  </div>
{/snippet}

{#snippet sidebarToggle()}
  {@const iconCls = sidebarVisibleEffecitve ? "ri--sidebar-fold-line" : "ri--sidebar-unfold-line"}
  <button
    aria-label="Toggle sidebar visibility"
    class="btn btn-square btn-sm"
    type="button"
    onclick={(e) => {
      sidebarVisible = !sidebarVisible;
      e.stopPropagation();
    }}
    data-sidebar-toggle
  >
    <span aria-hidden="true" class="iconify size-4 {iconCls}"></span>
  </button>
{/snippet}

<div class="flex">
  {@render sidebar()}
  <div class="sticky z-40 h-fit shrink-0 flex-col sm:hidden" style="top: {rootCtx.navbarHeight + 8}px;">
    {@render sidebarToggle()}
  </div>
  <div class="ms-2 mt-2 grow">
    {@render pageContent()}
  </div>
</div>
