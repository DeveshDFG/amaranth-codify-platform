<script lang="ts">
import { Restart } from "carbon-icons-svelte";
import Line from "../Line.svelte";
import { Button as CarbonButton } from "carbon-components-svelte";

let {
  title,
  refetch,
}: {
  title: string;
  refetch?: () => void;
} = $props();
</script>

<div>
  <h4>{title}</h4>
  {#if refetch}
    <CarbonButton
      size="small"
      kind="secondary"
      on:click={refetch}
      icon={Restart}
      iconDescription="Refetch"
      tooltipPosition="left"
    />
  {/if}
</div>
<Line color="var(--cds-layer)"/>

<style>
h4 {
  font-style: italic;
}
div {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: var(--cds-layer-accent);
  padding-left: var(--cds-spacing-05);
}
</style>
