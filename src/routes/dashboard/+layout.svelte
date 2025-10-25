<script lang="ts">
import { SideNavBar } from "$lib/components/dashboard/SideNavBar";

let { children } = $props();
</script>

<div id="dashboard-layout">
  <SideNavBar/>
  <div>{@render children?.()}</div>
</div>

<style>
div#dashboard-layout {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 2em;
}
</style>
