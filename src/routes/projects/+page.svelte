<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { projectGroups } from "$lib/projects";
  import { rootContext } from "$lib/context.svelte";
  import { onClickOutside } from "runed";
  import { fade } from "svelte/transition";
  import { ScrollArea } from "bits-ui";
  import { ScrollPos } from "$lib/scroll-watcher.svelte";
  import { MediaQuery } from "svelte/reactivity";

  const rootCtx = rootContext.get();
  let scrollMarginStyle = $derived(`scroll-margin-top: calc(4rem + ${rootCtx.navbarHeight}px);`);

  let sidebarVisible = $state(false);
  const twSm = new MediaQuery("(width >= 40rem)");
  let sidebarVisibleEffecitve = $derived(twSm.current || sidebarVisible);
  let sidebarElement: HTMLElement | null = $state(null);
  onClickOutside(() => sidebarElement, hideSidebar);

  function hideSidebar() {
    sidebarVisible = false;
  }

  let viewport: HTMLElement | null = $state(null);
  const viewportScrollPos = new ScrollPos(() => viewport);
  $effect(() => {
    rootCtx.updateContentUnderNavbar("projects-sidebar-scroll", viewportScrollPos.scrollY > 0);
  });
  $effect(() => {
    rootCtx.updateContentUnderNavbar("projects-sidebar-media-query", !twSm.current && sidebarVisible);
  });
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

{#snippet sidebar()}
  <!-- TODO: Make the view transition work again -->
  <div
    class="fixed z-50 shrink-0 bg-base-100/80 backdrop-blur data-[sidebar-visible=false]:hidden sm:sticky sm:data-[sidebar-visible=false]:block"
    style="height: calc(100dvh - {rootCtx.navbarHeight}px); top: {rootCtx.navbarHeight}px;"
    data-sidebar-visible={sidebarVisibleEffecitve}
    bind:this={sidebarElement}
    transition:fade={{ duration: 100 }}
  >
    <div class="flex size-full flex-col border-r border-base-300/80 sm:border-none">
      <div class="w-full bg-base-100 pt-2 pb-2 sm:hidden sm:pb-0">
        {@render sidebarToggle(false)}
      </div>
      <ScrollArea.Root class="grow overflow-hidden" type="auto">
        <ScrollArea.Viewport class="h-full" bind:ref={viewport}>
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
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          class="m-0.5 flex w-1.5 touch-none border-l border-l-transparent transition-all duration-200 select-none hover:w-2.5 hover:bg-base-300 [&:has(:active)]:w-2.5 [&:has(:active)]:bg-base-300"
        >
          <ScrollArea.Thumb forceMount class="flex-1 bg-base-content/50 transition-colors active:bg-primary" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  </div>
{/snippet}

<div class="flex">
  {@render sidebar()}
  <div class="sticky z-40 h-fit shrink-0 flex-col sm:hidden" style="top: {rootCtx.navbarHeight + 8}px;">
    {@render sidebarToggle(true)}
  </div>
  <div class="ms-2 mt-2 grow">
    {@render pageContent()}
  </div>
</div>
