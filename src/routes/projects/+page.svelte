<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import { onClickOutside } from "runed";
  import { fade } from "svelte/transition";
  import { ScrollArea } from "bits-ui";

  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootContext.get().navbarHeight}px);`);

  // Only takes effect on mobile
  let sidebarVisible = $state(false);
  let sidebarElement: HTMLElement | null = $state(null);
  onClickOutside(() => sidebarElement, hideSidebar);

  function hideSidebar() {
    sidebarVisible = false;
  }
</script>

<svelte:head>
  <title>Jason Penilla - Projects</title>
</svelte:head>

{#snippet sidebarToggle(show: boolean)}
  {@const iconCls = show ? "ri--sidebar-unfold-line" : "ri--sidebar-fold-line"}
  <button
    aria-label="Toggle sidebar visibility"
    class="btn btn-square btn-sm"
    class:pointer-events-none={show ? sidebarVisible : !sidebarVisible}
    type="button"
    onclick={(e) => {
      sidebarVisible = show;
      e.stopPropagation();
    }}
  >
    <span aria-hidden="true" class="iconify size-4 {iconCls}"></span>
  </button>
{/snippet}

{#snippet sidebar()}
  <ul class="menu menu-vertical w-max ps-0 pe-2 pt-0 pb-8 sm:pt-2">
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
{/snippet}

{#snippet pageContent()}
  {#each projectGroups as group (group.id)}
    <a href="#{group.id}" class="btn mb-2 btn-ghost">
      <h2 id={group.id} class="flex items-center gap-1 text-xl" style={scrollMarginStyle}>
        <span class="iconify size-6 {group.iconClasses}"></span>{group.name}
      </h2>
    </a>
    <div class="mb-6 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {#each group.projects as project (project.name)}
        <ProjectCard info={project} style={scrollMarginStyle} />
      {/each}
    </div>
  {/each}
{/snippet}

{#snippet sidebarContainer()}
  <div
    class="fixed z-50 shrink-0 bg-base-100/80 backdrop-blur sm:sticky sm:block"
    style="height: calc(100dvh - {rootContext.get().navbarHeight}px); top: {rootContext.get().navbarHeight}px;"
    bind:this={sidebarElement}
    class:hidden={!sidebarVisible}
    transition:fade={{ duration: 100 }}
  >
    <div class="flex size-full flex-col">
      <div class="w-full bg-base-100 pt-2 pb-2 sm:hidden sm:pb-0">
        {@render sidebarToggle(false)}
      </div>
      <ScrollArea.Root class="grow overflow-hidden" type="hover">
        <ScrollArea.Viewport class="h-full" children={sidebar} />
        <ScrollArea.Scrollbar
          orientation="vertical"
          class="m-0.5 flex w-2.5 touch-none rounded-full border-l border-l-transparent p-px transition-all duration-200 select-none hover:w-3 hover:bg-base-300"
        >
          <ScrollArea.Thumb forceMount class="flex-1 rounded-full bg-base-content/50" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  </div>
{/snippet}

<div class="flex">
  <!-- Dumb hack to let transitions work with changing style.display -->
  {#if sidebarVisible}
    {@render sidebarContainer()}
  {:else}
    {@render sidebarContainer()}
  {/if}
  <div class="sticky z-40 h-fit shrink-0 flex-col sm:hidden" style="top: {rootContext.get().navbarHeight + 8}px;">
    {@render sidebarToggle(true)}
  </div>
  <div class="ms-2 mt-2 grow sm:ms-0">
    {@render pageContent()}
  </div>
</div>
