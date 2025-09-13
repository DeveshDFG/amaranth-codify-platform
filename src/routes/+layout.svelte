<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "carbon-components-svelte/css/all.css";
import Header from "$lib/components/Header.svelte";

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header/>
{@render children?.()}
