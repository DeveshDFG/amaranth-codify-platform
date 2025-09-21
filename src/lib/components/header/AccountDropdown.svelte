<script lang="ts">
import { OverflowMenu, OverflowMenuItem } from "carbon-components-svelte";
import { User } from "carbon-icons-svelte";
import { authClient } from "$lib/auth-client";

const session = authClient.useSession();
let signedIn: boolean = $derived($session?.data !== null);
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