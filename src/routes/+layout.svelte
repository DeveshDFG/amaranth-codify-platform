<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "carbon-components-svelte/css/all.css";
import Header from "$lib/components/header/Header.svelte";
import LoaderSplash from "$lib/components/LoaderSplash.svelte";
import { theme } from "$lib/shared";

import "./global.css";

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<LoaderSplash/>
{#if theme()}
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