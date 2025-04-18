<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import { onClickOutside } from "runed";

  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootContext.get().navbarHeight}px);`);

  // Only takes effect on mobile
  let sidebarVisible = $state(false);
  let sidebarElement: HTMLElement | null = $state(null);

  onClickOutside(
    () => sidebarElement,
    () => {
      sidebarVisible = false;
    },
  );

  function hideSidebar() {
    sidebarVisible = false;
  }
</script>

<svelte:head>
  <title>Jason Penilla - Projects</title>
</svelte:head>

{#snippet sidebarToggle()}
  {@const iconCls = sidebarVisible ? "ri--sidebar-fold-line" : "ri--sidebar-unfold-line"}
  <button aria-label="Expand sidebar" class="btn btn-square btn-sm" onclick={() => (sidebarVisible = !sidebarVisible)}>
    <span aria-hidden="true" class="iconify size-4 {iconCls}"></span>
  </button>
{/snippet}

{#snippet sidebar()}
  <ul class="menu menu-vertical w-max p-0">
    <li class="sticky top-0 z-10 w-full bg-base-100 py-2 sm:hidden">
      {@render sidebarToggle()}
    </li>
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

<div class="flex">
  <div
    class="fixed z-50 shrink-0 overflow-y-auto bg-base-100/80 backdrop-blur sm:sticky sm:block"
    style="height: calc(100dvh - {rootContext.get().navbarHeight}px); top: {rootContext.get().navbarHeight}px;"
    bind:this={sidebarElement}
    class:hidden={!sidebarVisible}
  >
    {@render sidebar()}
  </div>
  <div
    class="sticky z-40 flex shrink-0 flex-col sm:hidden"
    style="height: calc(100dvh - {rootContext.get().navbarHeight}px); top: {rootContext.get().navbarHeight + 8}px;"
  >
    {@render sidebarToggle()}
  </div>
  <div class="ms-2 grow">
    {@render pageContent()}
  </div>
</div>
