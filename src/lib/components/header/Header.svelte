<script lang="ts">
import AccountDropdown from "./AccountDropdown.svelte";
import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<header>
  <h6>Amaranth Codify</h6>
  <div>
    <AccountDropdown/>
    <ThemeSwitcher/>
  </div>
</header>

<style>
header {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4em;
  height: 3rem;
  border-bottom: 1px solid var(--cds-border-strong);
  background: var(--cds-ui-background);
}

div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
