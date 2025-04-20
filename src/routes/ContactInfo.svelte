<script lang="ts">
  import ModrinthIcon from "$lib/components/ModrinthIcon.svelte";

  let { ...restProps } = $props();
</script>

<div {...restProps}>
  <ul class="flex flex-col gap-1">
    <li>
      <a class="flex w-fit items-center gap-1" href="mailto:admin@jpenilla.com">
        <span class="iconify size-6 bg-primary ri--mail-send-line"></span>
        <span class="font-semibold">Email</span>
        <span class="text-base-content/50">-</span>
        <span class="link-parent-hover link">admin@jpenilla.com</span>
      </a>
    </li>
    <li>
      <a
        class="flex w-fit items-center gap-1"
        href="https://github.com/jpenilla"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="iconify size-6 logos--github-icon"></span>
        <span class="font-semibold">GitHub</span>
        <span class="text-base-content/50">-</span>
        <span class="link-parent-hover link">jpenilla</span>
      </a>
    </li>
    <li>
      <a
        class="flex w-fit items-center gap-1"
        href="https://discord.com/users/jmp_"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="iconify size-6 bg-discord logos--discord-icon"></span>
        <span class="font-semibold text-discord">Discord</span>
        <span class="text-base-content/50">-</span>
        <span class="link-parent-hover link">jmp_</span>
      </a>
    </li>
    <li>
      <a
        class="flex w-fit items-center gap-1"
        href="https://modrinth.com/user/jpenilla"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ModrinthIcon class="size-6 text-modrinth" />
        <span class="font-semibold text-modrinth">Modrinth</span>
        <span class="text-base-content/50">-</span>
        <span class="link-parent-hover link">jpenilla</span>
      </a>
    </li>
  </ul>
</div>

<style>
  .link-parent-hover {
    text-decoration-line: none;
  }

  a:hover .link-parent-hover {
    text-decoration-line: underline;
  }
</style>
