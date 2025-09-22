<script lang="ts">
import {
  Button,
  FluidForm,
  PasswordInput,
  TextInput,
} from "carbon-components-svelte";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { isValidEmail, isValidPassword, isValidUsername } from "$lib/string";
import type { PageProps } from "./$types";

let { form }: PageProps = $props();

onMount(() => {
  if (form?.success) {
    setTimeout(() => {
      goto("/sign-in");
    }, 3000);
  }
});

let usernameInput = $state("");
let usernameValid = $derived(isValidUsername(usernameInput));

let emailInput = $state("");
let emailValid = $derived(isValidEmail(emailInput));

let passwordInput = $state("");
let passwordValid = $derived(isValidPassword(passwordInput));
let passwordConfirmInput = $state("");
let passwordsMatch = $derived(passwordInput === passwordConfirmInput);

let shouldCheckMatchingPasswords = $state(false);

$effect(() => {
  if (!shouldCheckMatchingPasswords && passwordConfirmInput.length > 0) {
    shouldCheckMatchingPasswords = true;
  }
});

let disabled = $derived(
  !passwordInput || !passwordsMatch || !passwordValid || !emailValid,
);
</script>

<div>
    {#if !form || !form.success}
        <h1>Sign Up</h1>
        <p>Already have an account? <a href="/sign-in">Sign in</a></p>
        {#if !form?.success && form?.message}
            <p style="color: red">{form.message}</p>
        {/if}
        <FluidForm method="POST" action="/sign-up">
            <TextInput invalid={!usernameValid && usernameInput.length > 0} bind:value={usernameInput} invalidText="Username must be between 3 and 36 characters, start with a letter, and can only contain letters, numbers, and underscores (no spaces or special characters)." labelText="Username" type="text" name="username" required />
            <TextInput invalid={!emailValid && emailInput.length > 0} bind:value={emailInput} invalidText="Please enter a valid email address" labelText="Email" type="email" name="email" required />
            <PasswordInput invalid={!passwordValid && passwordInput.length > 0} invalidText={"Passwords must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"} bind:value={passwordInput} labelText="Password" name="password" required />
            <PasswordInput invalid={!passwordsMatch && shouldCheckMatchingPasswords} invalidText="Passwords must match" bind:value={passwordConfirmInput} labelText="Confirm Password" required />
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