<script lang="ts">
import { Loading } from "carbon-components-svelte";
import { useLoading } from "$lib/shared";

const { isLoading } = useLoading();
</script>

{#if isLoading()}
<div>
  <Loading/>
</div>
{/if}

<style>
:global(.bx--loading__stroke) {
  stroke: #f4f4f4;
}
:global(.bx--loading-overlay) {
  background: #161616;
}
div {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
