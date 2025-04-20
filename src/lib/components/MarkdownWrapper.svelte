<script lang="ts">
  import { mergeProps } from "bits-ui";

  let { children, ...restProps } = $props();
  let mergedProps = $derived(mergeProps({ class: "prose" }, restProps));
</script>

<div {...mergedProps}>
  {@render children()}
</div>
