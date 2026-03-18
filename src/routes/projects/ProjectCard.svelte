<script module lang="ts">
  const compactNumberFormatter = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
  const exactNumberFormatter = new Intl.NumberFormat("en");
</script>

<script lang="ts">
  import { type RestProps, ProjectInfo } from "$lib/types";
  import ProjectMetaLink from "./ProjectMetaLink.svelte";

  interface Props extends RestProps {
    project: ProjectInfo;
    focused?: boolean;
    githubStars?: number | null;
    githubStarsPending?: boolean;
  }

  let { project, focused = false, githubStars = null, githubStarsPending = false, ...restProps }: Props = $props();

  let Description = $derived(project.description);
</script>

<div
  id={project.id}
  class={["project-card card relative overflow-hidden bg-base-200"]}
  data-focused={focused}
  {...restProps}
>
  <div
    aria-hidden="true"
    class={[
      "pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-primary opacity-0 transition-opacity duration-200",
      focused && "opacity-100",
    ]}
  ></div>
  <div class="card-body gap-3">
    <div class="flex flex-col gap-2.5">
      <a class="card-title link link-hover" href="#{project.id}">{project.name}</a>
      <div class="flex flex-wrap items-center gap-2">
        <div class="join">
          <ProjectMetaLink
            href={project.githubUrl}
            text={`${project.githubOwner}/${project.githubRepo}`}
            iconClasses="iconify logos--github-icon"
            joined
          />
          {#if githubStarsPending}
            <div
              aria-hidden="true"
              class="join-item flex h-8 min-h-8 items-center gap-2 border border-base-content/10 bg-base-100 px-2"
            >
              <span class="iconify size-4 text-warning ri--star-fill"></span>
              <span class="h-3 w-10 skeleton rounded-full"></span>
            </div>
          {:else if githubStars !== null}
            <ProjectMetaLink
              href={`${project.githubUrl}/stargazers`}
              text={compactNumberFormatter.format(githubStars)}
              iconClasses="iconify ri--star-fill text-warning"
              joined
              ariaLabel={`${exactNumberFormatter.format(githubStars)} GitHub stars`}
              title={`${exactNumberFormatter.format(githubStars)} GitHub stars`}
            />
          {/if}
        </div>
        {#each project.links as link, index (index)}
          <ProjectMetaLink
            href={link.url}
            text={link.text}
            iconClasses={link.iconClasses}
            iconComponent={link.iconComponent}
          />
        {/each}
      </div>
    </div>
    <Description class="prose prose-sm grow" />
    {#if project.technologies.length > 0}
      <ul class="menu menu-horizontal w-fit menu-sm rounded-sm bg-base-100 p-1">
        {#each project.technologies as tech, index (index)}
          <li class="tooltip" data-tip={tech.name}>
            <a aria-label="{tech.name} Website" href={tech.url} target="_blank" rel="noopener noreferrer" class="p-1">
              <span aria-hidden="true" class="size-5 {tech.iconClasses}"></span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
