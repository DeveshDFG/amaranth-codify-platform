<script lang="ts">
import { Button } from "carbon-components-svelte";
import Theme from "carbon-components-svelte/src/Theme/Theme.svelte";
import { Moon, Sun } from "carbon-icons-svelte";
import { setTheme, theme } from "$lib/shared/theme.svelte";

let darkMode = $derived(theme() === "g100");

function toggleTheme() {
  setTheme(theme() === "g10" ? "g100" : "g10");
}
</script>

<Button on:click={toggleTheme} kind="ghost" size="field" iconDescription={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
    {#if darkMode}
        <Moon slot="icon" color="white"/>
    {:else}
        <Sun slot="icon" color="black"/>
    {/if}
</Button>
<Theme theme={theme() ?? "g10"}/>
