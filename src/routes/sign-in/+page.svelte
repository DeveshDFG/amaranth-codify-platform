<script lang="ts">
import { Button as CarbonButton, TextInput } from "carbon-components-svelte";
import { applyAction, enhance } from "$app/forms";
import { signInGoogle, signInLinkedIn } from "$lib/auth-client";
import { useLoading } from "$lib/shared/loading.svelte";
import type { PageProps, SubmitFunction } from "./$types";
import gLogo from "$lib/assets/Google__G__logo.svg";
import linkInLogo from "$lib/assets/linkedin-svgrepo-com.svg";

let { form }: PageProps = $props();

let emailInput = $state("");
let passwordInput = $state("");

let invalid = $derived(!emailInput || !passwordInput);

const { startLoading, stopLoading } = useLoading();

const submitForm: SubmitFunction = () => {
  {
    startLoading();
    return async ({ result }) => {
      await applyAction(result);
      passwordInput = "";
      stopLoading();
    };
  }
};
</script>

<div>
  <h1>Sign In</h1>
  <p>
    Don't have an account? <a href="/sign-up">Sign up</a>
  </p>
  {#if !form?.success && form?.message}
    <p style="color: red">{form.message}</p>
  {/if}
  <form
    method="POST"
    action="/sign-in"
    class="bx--form--fluid  bx--form"
    use:enhance={submitForm}
  >
    <TextInput
      bind:value={emailInput}
      labelText="Email or Username"
      type="text"
      name="emailOrUsername"
      required
    />
    <TextInput
      bind:value={passwordInput}
      labelText="Password"
      type="password"
      name="password"
      required
    />
    <CarbonButton disabled={invalid} type="submit">Sign In</CarbonButton>
    <br>
    <CarbonButton on:click={signInGoogle}>
      <img src={gLogo}>
      Sign in with Google
    </CarbonButton>
    <br>
    <CarbonButton on:click={signInLinkedIn}>
      <img src={linkInLogo}>
      Sign in with LinkedIn
    </CarbonButton>
  </form>
</div>

<style>
div {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
