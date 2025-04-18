<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";

  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootContext.get().navbarHeight}px);`);
</script>

<svelte:head>
  <title>Jason Penilla - Projects</title>
</svelte:head>

{#snippet sidebar()}
  <ul class="menu menu-vertical w-max">
    {#each projectGroups as group (group.id)}
      <li>
        <span class="menu-title">{group.name}</span>
        <ul>
          {#each group.projects as project (project.name)}
            <li><a href="#{project.id}">{project.name}</a></li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet pageContent()}
  {#each projectGroups as group (group.id)}
    <a href="#{group.id}" class="link link-hover">
      <h2 id={group.id} class="mb-2 flex items-center gap-1 text-xl" style={scrollMarginStyle}>
        <span class="iconify size-6 {group.iconClasses}"></span>{group.name}
      </h2>
    </a>
    <div class="mb-4 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {#each group.projects as project (project.name)}
        <ProjectCard info={project} style={scrollMarginStyle} />
      {/each}
    </div>
  {/each}
{/snippet}

<div class="flex">
  <div
    class="sticky shrink-0 overflow-y-auto"
    style="height: calc(100dvh - {rootContext.get().navbarHeight}px); top: {rootContext.get().navbarHeight}px;"
  >
    {@render sidebar()}
  </div>
  <div class="ms-2 grow">
    {@render pageContent()}
  </div>
</div>
