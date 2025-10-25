<script lang="ts">
import { Button as CarbonButton } from "carbon-components-svelte";
import Theme from "carbon-components-svelte/src/Theme/Theme.svelte";
import { Moon, Sun } from "carbon-icons-svelte";
import { setTheme, theme } from "$lib/shared/theme.svelte";

let darkMode = $derived(theme() === "g100");

function toggleTheme() {
  setTheme(theme() === "g10" ? "g100" : "g10");
}
</script>

<CarbonButton
  on:click={toggleTheme}
  kind="ghost"
  size="field"
  iconDescription={darkMode ? "Switch to light mode" : "Switch to dark mode"}
>
  {#if darkMode}
  <Moon slot="icon" color="white"/>
  {:else}
  <Sun slot="icon" color="black"/>
  {/if}
</CarbonButton>
<Theme theme={theme() ?? "g10"}/>
