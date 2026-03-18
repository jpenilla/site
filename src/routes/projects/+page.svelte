<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import Sidebar from "./Sidebar.svelte";
  import SidebarToggle from "./SidebarToggle.svelte";
  import { getProjectGitHubStars } from "./stars.remote";

  let { data }: { data: PageData } = $props();

  const rootCtx = rootContext.get();
  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootCtx.navbarHeight}px);`);

  let sidebarVisible = $state(false);
  let focusedId = $state<string | null>(null);
  const githubStars = getProjectGitHubStars();

  onMount(() => {
    const updateFocusedId = () => {
      focusedId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : null;
    };

    updateFocusedId();
    window.addEventListener("hashchange", updateFocusedId);

    return () => {
      window.removeEventListener("hashchange", updateFocusedId);
    };
  });
</script>

<svelte:head>
  <title>Jason Penilla - Projects</title>
</svelte:head>

{#snippet pageContent()}
  {#each projectGroups as group (group.id)}
    <div class="relative mb-2 inline-flex">
      {#if focusedId === group.id}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute -inset-1 border-2 border-primary"
          style="border-radius: calc(var(--radius-field) + 0.25rem);"
        ></div>
      {/if}
      <a
        href="#{group.id}"
        class="btn relative btn-ghost"
        aria-current={focusedId === group.id ? "location" : undefined}
      >
        <h2 id={group.id} class="flex items-center gap-1 text-xl" style={scrollMarginStyle}>
          <span class="iconify size-6 {group.iconClasses}"></span>{group.name}
        </h2>
      </a>
    </div>
    <div class="mb-6 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3">
      {#each group.projects as project (project.name)}
        {@const fullName = `${project.githubOwner}/${project.githubRepo}`}
        <ProjectCard
          {project}
          focused={focusedId === project.id}
          githubStars={githubStars.current?.[fullName] ?? data.cachedGitHubStars?.[fullName] ?? null}
          githubStarsPending={!githubStars.ready && data.cachedGitHubStars === null}
          style={scrollMarginStyle}
        />
      {/each}
    </div>
  {/each}
{/snippet}

<div class="flex">
  <div class="sticky z-40 h-fit shrink-0 flex-col sm:hidden" style="top: {rootCtx.navbarHeight + 8}px;">
    <SidebarToggle bind:sidebarVisible />
  </div>
  <Sidebar bind:sidebarVisible {focusedId} />
  <div class="ms-2 mt-2 grow">
    {@render pageContent()}
  </div>
</div>
