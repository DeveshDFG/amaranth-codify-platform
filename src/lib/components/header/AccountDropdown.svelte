<script lang="ts">
import { OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
import { User } from "carbon-icons-svelte";
import { authClient } from "$lib/auth-client";

let signedIn = $state(false);
let open = $state(false);
</script>

<OverflowMenu
  bind:open={open}
  icon={User}
  flipped
  on:click={async () => {
    if (open) return; // only check when opening the menu
    signedIn = !!(await authClient.getSession()).data
}}
>
  {#if signedIn}
  <OverflowMenuItem text="Account" href="/account"/>
  <OverflowMenuItem text="Sign Out" href="/sign-out"/>
  {:else}
  <OverflowMenuItem text="Sign In" href="/sign-in"/>
  <OverflowMenuItem text="Sign Up" href="/sign-up"/>
  {/if}
</OverflowMenu>
