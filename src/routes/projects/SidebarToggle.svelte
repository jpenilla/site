<script lang="ts">
  interface SidebarToggleProps {
    sidebarVisible: boolean;
  }

  let { sidebarVisible = $bindable() }: SidebarToggleProps = $props();

  let iconCls = $derived(sidebarVisible ? "ri--sidebar-fold-line" : "ri--sidebar-unfold-line");
</script>

<button
  aria-label="Toggle sidebar visibility"
  class="btn btn-square btn-sm"
  type="button"
  onclick={(e) => {
    sidebarVisible = !sidebarVisible;
    e.stopPropagation();
  }}
  data-sidebar-toggle
>
  <span aria-hidden="true" class="iconify size-4 {iconCls}"></span>
</button>
