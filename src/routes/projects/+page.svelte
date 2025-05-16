<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import Sidebar from "./Sidebar.svelte";
  import SidebarToggle from "./SidebarToggle.svelte";

  const rootCtx = rootContext.get();
  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootCtx.navbarHeight}px);`);

  let sidebarVisible = $state(false);
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

<div class="flex">
  <div class="sticky z-40 h-fit shrink-0 flex-col sm:hidden" style="top: {rootCtx.navbarHeight + 8}px;">
    <SidebarToggle bind:sidebarVisible />
  </div>
  <Sidebar bind:sidebarVisible />
  <div class="ms-2 mt-2 grow">
    {@render pageContent()}
  </div>
</div>
