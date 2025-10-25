<script lang="ts">
import { onMount } from "svelte";
import { authClient } from "$lib";

let signedOut = $state(false);

onMount(async () => {
  await authClient.signOut();
  signedOut = true;
});
</script>

<div>
  {#if signedOut}
  <h1>Signed Out</h1>
  <p>
    You have been successfully signed out. <a href="/sign-in">Sign in again</a>
  </p>
  {:else}
  <h1>Signing Out...</h1>
  <p>Please wait while we sign you out.</p>
  {/if}
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
