<script lang="ts">
  import { NavigationMenu } from "bits-ui";

  interface Props {
    coveringContent: boolean;
  }

  let { coveringContent }: Props = $props();

  let activeRootItem: string | undefined = $state("");
</script>

{#snippet title()}
  <NavigationMenu.Item>
    <NavigationMenu.Link class="btn btn-ghost btn-xl" href="/">
      <h1 class="text-3xl font-bold">Jason Penilla</h1>
    </NavigationMenu.Link>
  </NavigationMenu.Item>
{/snippet}

{#snippet projects()}
  <NavigationMenu.Item value="projects">
    <NavigationMenu.Link class="btn text-xl btn-ghost" href="/projects">Projects</NavigationMenu.Link>
  </NavigationMenu.Item>
{/snippet}

<div class="w-full bg-base-100/80 backdrop-blur transition-shadow" class:shadow-xs={coveringContent}>
  <NavigationMenu.Root class="mx-auto max-w-[100rem]" bind:value={activeRootItem}>
    <NavigationMenu.List class="flex items-center p-2">
      {@render title()}
      {@render projects()}
    </NavigationMenu.List>
  </NavigationMenu.Root>
</div>
