<script lang="ts">
  import { type RestProps, ProjectInfo } from "$lib/types";

  interface Props extends RestProps {
    info: ProjectInfo;
  }

  let { info, ...restProps }: Props = $props();
</script>

<div id={info.id} class="card bg-base-200" {...restProps}>
  <div class="card-body">
    <div>
      <a class="card-title link link-hover" href="#{info.id}">{info.name}</a>
      <div class="flex flex-wrap gap-x-2 text-nowrap">
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
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <p>{@html info.description}</p>
    {#if info.technologies.length > 0}
      <ul class="menu menu-horizontal card-actions w-fit menu-sm rounded-sm bg-base-100 p-1">
        {#each info.technologies as tech, index (index)}
          <li class="tooltip" data-tip={tech.name}>
            <a aria-label="{tech.name} Website" href={tech.url} target="_blank" class="p-0.5">
              <span aria-hidden="true" class="size-4 {tech.iconClasses}"></span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
