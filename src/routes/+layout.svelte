<script lang="ts">
import favicon from "$lib/assets/favicon.svg";
import "carbon-components-svelte/css/all.css";
import { onMount } from "svelte";

let { children } = $props();

onMount(() => {
  document.documentElement.setAttribute("theme", "g100");
});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
