<script lang="ts">
  import type { ProjectInfo } from "$lib/projects";
  import type { RestProps } from "$lib/types";

  interface Props extends RestProps {
    info: ProjectInfo;
  }

  let { info, ...restProps }: Props = $props();
</script>

<div id={info.id} class="card bg-base-200 shadow-sm" {...restProps}>
  <div class="card-body">
    <div>
      <a class="card-title link link-hover" href="#{info.id}">{info.name}</a>
      <div class="flex flex-wrap gap-2 text-nowrap">
        <a href={info.githubUrl} target="_blank" class="flex w-max link items-center link-hover">
          <span class="me-1 iconify size-4 logos--github-icon"></span>
          {info.githubOwner}<span class="mx-0.5 text-base-content/50">/</span>{info.githubRepo}
        </a>
        {#each info.links as link, index (index)}
          <a href={link.url} target="_blank" class="flex w-max link items-center gap-1 link-hover">
            {#if link.iconComponent}
              {@const IconComponent = link.iconComponent}
              <IconComponent class="size-4 {link.iconClasses}" />
            {:else}
              <span class="iconify size-4 {link.iconClasses}"></span>
            {/if}
            {link.text}
          </a>
        {/each}
      </div>
    </div>
    <p>{info.description}</p>
  </div>
</div>
