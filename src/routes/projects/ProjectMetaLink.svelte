<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    href: string;
    text: string;
    iconClasses?: string;
    iconComponent?: Component;
    joined?: boolean;
    title?: string;
    ariaLabel?: string;
  }

  let {
    href,
    text,
    iconClasses = "",
    iconComponent,
    joined = false,
    title = undefined,
    ariaLabel = undefined,
  }: Props = $props();
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class={[
    "btn h-8 min-h-8 border border-base-content/10 bg-base-100 px-2 font-normal text-base-content shadow-none btn-ghost btn-sm hover:bg-base-300/50",
    joined ? "join-item" : "rounded-md",
  ]}
  {title}
  aria-label={ariaLabel}
>
  {#if iconComponent}
    {@const IconComponent = iconComponent}
    <IconComponent class="size-4 {iconClasses}" />
  {:else if iconClasses}
    <span aria-hidden="true" class="size-4 {iconClasses}"></span>
  {/if}
  <span class="text-nowrap">{text}</span>
</a>
