<script lang="ts">
import { Header } from "carbon-components-svelte";
import AccountDropdown from "./AccountDropdown.svelte";
import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<Header company="Amaranth Codify">
    <div>
        <AccountDropdown/>
        <ThemeSwitcher/>
    </div>
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

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1em;
    }
</style>