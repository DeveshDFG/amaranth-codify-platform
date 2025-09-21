<script lang="ts">
import {
  OverflowMenu,
  OverflowMenuItem,
  Theme,
} from "carbon-components-svelte";
import { User } from "carbon-icons-svelte";
import { onMount } from "svelte";

let signedIn: boolean = $state(false);

onMount(async () => {
  let response = await fetch("/api/me");
  if (response.ok) {
    signedIn = true;
  }
});
</script>

<OverflowMenu icon={User} flipped>
    {#if signedIn}
        <OverflowMenuItem text="Account" href="/account"/>
        <OverflowMenuItem text="Sign Out" href="/sign-out"/>
    {:else}
        <OverflowMenuItem text="Sign In" href="/sign-in"/>
        <OverflowMenuItem text="Sign Up" href="/sign-up"/>
    {/if}
</OverflowMenu>