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
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 7fr;
  gap: 2em;
}

div#dashboard-layout > div {
  overflow: hidden;
}
</style>
