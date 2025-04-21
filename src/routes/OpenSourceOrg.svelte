<script lang="ts">
  import type { Organization } from "$lib/types";

  interface Props {
    org: Organization;
  }

  let { org }: Props = $props();

  const Description = org.description;
</script>

<div class="card bg-base-200 card-sm">
  <div class="card-body">
    <a
      class="flex link flex-row items-center gap-2 link-hover"
      href={org.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="https://github.com/{org.name}.png" alt="{org.name} logo" class="size-8" />
      <div class="flex flex-col gap-0.5 leading-none">
        <h3 class="card-title">{org.name}</h3>
        <span class="text-sm">{org.role}</span>
      </div>
    </a>
    <Description class="prose prose-sm grow" />
  </div>
</div>
