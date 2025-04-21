<script lang="ts">
  import { NavigationMenu } from "bits-ui";
  import { page } from "$app/state";

  interface Props {
    coveringContent: boolean;
  }

  let { coveringContent }: Props = $props();

  const activePage = $derived(page.url.pathname);

  function isActivePage(path: string) {
    return activePage === path;
  }
</script>

{#snippet title()}
  <NavigationMenu.Item value="/">
    <NavigationMenu.Link data-active={isActivePage("/")} class="navlink" href="/">
      <h1 class="text-3xl font-bold">Jason Penilla</h1>
    </NavigationMenu.Link>
  </NavigationMenu.Item>
{/snippet}

{#snippet projects()}
  <NavigationMenu.Item value="/projects">
    <NavigationMenu.Link data-active={isActivePage("/projects")} class="navlink text-xl font-semibold" href="/projects">
      Projects
    </NavigationMenu.Link>
  </NavigationMenu.Item>
{/snippet}

<div
  class="w-full bg-base-100/80 backdrop-blur transition-shadow data-[covering-content=true]:shadow-xs"
  data-covering-content={coveringContent}
>
  <NavigationMenu.Root class="navroot mx-auto max-w-[100rem]">
    <NavigationMenu.List class="flex items-end gap-4 p-4">
      {@render title()}
      {@render projects()}
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>

<style>
  :global {
    .navlink {
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
      text-decoration-color: var(--color-primary);
    }

    .navlink:hover {
      text-decoration-line: underline;
    }

    .navlink[data-active="true"] {
      text-decoration-line: underline;
    }

    .navroot:has(.navlink:not([data-active="true"]):hover) .navlink[data-active="true"] {
      text-decoration-line: none;
    }
  }
</style>
