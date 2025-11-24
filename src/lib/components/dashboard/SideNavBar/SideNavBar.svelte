<script lang="ts">
import { authClient } from "$lib/auth-client";
import Line from "$lib/components/Line.svelte";
import { UserRole } from "$lib/types/user-role";
import SideNavBarLink from "./SideNavBarLink.svelte";

const session = authClient.useSession();
</script>

<div>
  <SideNavBarLink label="Home" path="/dashboard"/>
  <SideNavBarLink label="Account" path="/dashboard/account"/>
  <SideNavBarLink label="Profile" path="/dashboard/profile"/>
  {#if $session.data?.user?.role === UserRole.ADMIN}
    <Line thickness={1} color="var(--cds-border-strong)"/>
    <SideNavBarLink label="Admin Panel" path="/dashboard/admin"/>
  {/if}
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--cds-border-strong);
  border-right: 1px solid var(--cds-border-strong);
  padding: 1em 0 4em 0;
}
</style>
