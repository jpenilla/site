<script>
  import ContactInfo from "./ContactInfo.svelte";
  import OpenSourceOrg from "./OpenSourceOrg.svelte";
  import { organizations } from "$lib/orgs";
  import ASULogo from "$lib/components/ASULogo.svelte";
</script>

<svelte:head>
  <title>Jason Penilla</title>
</svelte:head>

<h2 class="mt-2 text-xl font-semibold">Full-Stack Developer</h2>
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
    <h3 aria-label="Arizona State University" class="h-8 w-full">
      <ASULogo aria-hidden="true" class="h-full w-fit max-w-full" />
    </h3>
    <div class="prose prose-sm flex flex-col">
      <span class="font-semibold text-base-content">Ira A. Fulton Schools of Engineering</span>
      <span>Master of Science in Software Engineering, Graduating May 2027</span>
    </div>
  </div>
</div>
<div class="card m-2 bg-base-200 card-sm">
  <div class="card-body">
    <h3 aria-label="Arizona State University" class="h-8 w-full">
      <ASULogo aria-hidden="true" class="h-full w-fit max-w-full" />
    </h3>
    <div class="prose prose-sm flex flex-col">
      <span class="font-semibold text-base-content">W.P. Carey School of Business</span>
      <span>Bachelor of Science in Computer Information Systems, Graduated December 2025</span>
    </div>
  </div>
</div>
