<script>
  import ContactInfo from "./ContactInfo.svelte";
  import OpenSourceOrg from "./OpenSourceOrg.svelte";
  import { organizations } from "$lib/orgs.js";
  import ASULogo from "$lib/components/ASULogo.svelte";
</script>

<svelte:head>
  <title>Jason Penilla</title>
</svelte:head>

<h2 class="text-xl font-semibold">Full-Stack Developer</h2>
<ContactInfo class="m-2 mb-4" />

<h2 class="text-xl font-semibold">Open Source Organizations</h2>
<div class="m-2 mb-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
  {#each organizations as org, index (index)}
    <OpenSourceOrg {org} />
  {/each}
</div>

<h2 class="text-xl font-semibold">Education</h2>
<div class="card m-2 bg-base-200 card-sm">
  <div class="card-body">
    <ASULogo class="h-8 w-fit" />
    <div class="flex flex-col">
      <span class="font-semibold">W.P. Carey School of Business</span>
      <span>Bachelor of Science in Computer Information Systems, Graduating Fall 2025</span>
    </div>
  </div>
</div>
