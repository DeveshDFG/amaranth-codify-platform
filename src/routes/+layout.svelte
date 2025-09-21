<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "carbon-components-svelte/css/all.css";
import { onMount } from "svelte";
import Header from "$lib/components/header/Header.svelte";
import LoaderSplash from "$lib/components/LoaderSplash.svelte";
import { theme } from "$lib/shared/theme.svelte";

let { children } = $props();

let loadingTime: number = $state(0);

onMount(() => {
  setInterval(() => {
    loadingTime += 100;
  }, 100);
});

const loading: boolean = $derived(loadingTime < 500 || !theme());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{#if loading}
    <LoaderSplash/>
{:else}
    <Header/>
    <div>
        {@render children?.()}
    </div>
{/if}

<style>
    div {
        padding-top: 3rem;
    }
</style>