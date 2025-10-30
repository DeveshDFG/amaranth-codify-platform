<!--
    @component

    Cell for DataTable that formats certain keys.
-->
<script lang="ts">
const { key, value }: { key: string; value: string } = $props();
</script>

{#if key === "id"}
{(value as string).slice(0,8)}
{:else if key === "createdAt" || key === "updatedAt"}
{new Date(value).toLocaleString()}
{:else if key === "email"}
<a href={"mailto:" + value}>{value}</a>
{:else}
{value}
{/if}
