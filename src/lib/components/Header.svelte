<script lang="ts">
import { Header } from "carbon-components-svelte";
import { Home } from "carbon-icons-svelte";
import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<Header company="Amaranth Codify">
    <ThemeSwitcher/>
</Header>

<style>
    :global(.bx--header) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4em;
    }

    :global(a.bx--header__name) {
        padding: 0;
    }
</style>