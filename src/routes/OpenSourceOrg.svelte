<script lang="ts">
  import type { Organization } from "$lib/types";

  interface Props {
    org: Organization;
  }

  let { org }: Props = $props();
</script>

<div class="card bg-base-200 card-sm">
  <div class="card-body">
    <a class="flex link flex-row items-center gap-2 link-hover" href={org.url} target="_blank">
      <img src="https://github.com/{org.name}.png" alt="{org.name} logo" class="size-8" />
      <div class="flex flex-col gap-0.5 leading-none">
        <h3 class="card-title">{org.name}</h3>
        <span>{org.role}</span>
      </div>
    </a>
    <p>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html org.description}
    </p>
  </div>
</div>
