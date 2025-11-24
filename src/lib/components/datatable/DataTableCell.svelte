<!--
    @component

    Cell for DataTable that formats certain keys.
-->
<script lang="ts">
const { key, value }: { key: string; value: string } = $props();
</script>

{#if key === "id"}
  <p>{(value as string).slice(0,8)}</p>
{:else if key === "createdAt" || key === "updatedAt"}
  <p>{new Date(value).toLocaleString()}</p>
{:else if key === "email"}
  <a href={"mailto:" + value}>{value}</a>
{:else}
  <p>{value}</p>
{/if}
