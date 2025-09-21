<script lang="ts">
import Theme from "carbon-components-svelte/src/Theme/Theme.svelte";
import { Moon, Sun } from "carbon-icons-svelte";
import { setTheme, theme } from "$lib/shared/theme.svelte";

let darkMode = $derived(theme() === "g100");

function toggleTheme() {
  setTheme(theme() === "g10" ? "g100" : "g10");
}
</script>

<div
    onclick={toggleTheme}
    onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTheme();
        }
    }}
    tabindex="0"
    role="button"
    aria-pressed={darkMode}
>
    {#if darkMode}
        <Moon color="white" size={24}/>
    {:else}
        <Sun color="white" size={24}/>
    {/if}
    <Theme theme={theme() ?? "g10"}/>
</div>
<style>
    div {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
</style>
