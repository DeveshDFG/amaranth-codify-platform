<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "carbon-components-svelte/css/all.css";
import Header from "$lib/components/header/Header.svelte";
import LoaderSplash from "$lib/components/LoaderSplash.svelte";

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<LoaderSplash/>
<Header/>
<div>
    {@render children?.()}
</div>

<style>
    div {
        padding-top: 3rem;
    }
</style>