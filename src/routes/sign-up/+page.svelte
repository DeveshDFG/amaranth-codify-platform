<script lang="ts">
import {
  Button,
  FluidForm,
  PasswordInput,
  TextInput,
} from "carbon-components-svelte";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import type { PageProps } from "./$types";

let { form }: PageProps = $props();

onMount(() => {
  if (form?.success) {
    setTimeout(() => {
      goto("/sign-in");
    }, 3000);
  }
});

let passwordInput = $state("");
let passwordConfirmInput = $state("");
let passwordInvalid = $derived(
  passwordInput !== passwordConfirmInput && passwordConfirmInput.length > 0,
);

let disabled = $derived(!passwordInput || passwordInvalid);
</script>

<div>
    {#if !form || !form.success}
        <h1>Sign Up</h1>
        <p>Already have an account? <a href="/sign-in">Sign in</a></p>
        {#if !form?.success && form?.message}
            <p style="color: red">{form.message}</p>
        {/if}
        <FluidForm method="POST" action="/sign-up">
            <TextInput labelText="Username" type="text" name="username" required />
            <TextInput labelText="Email" type="email" name="email" required />
            <PasswordInput bind:value={passwordInput} labelText="Password" name="password" required />
            <PasswordInput invalid={passwordInvalid} invalidText="Passwords must match" bind:value={passwordConfirmInput} labelText="Confirm Password" required />
            <Button {disabled} type="submit">Create Account</Button>
        </FluidForm>
    {:else}
        <p>Account created successfully! Redirecting to sign in...</p><p>If it doesn't redirect automatically, <a href="/sign-in">click here</a>.</p>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 4em;
    }
</style>