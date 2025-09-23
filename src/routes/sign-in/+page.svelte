<script lang="ts">
import { Button, TextInput } from "carbon-components-svelte";
import { applyAction, enhance } from "$app/forms";
import { useLoading } from "$lib/shared/loading.svelte";
import type { PageProps } from "./$types";
import { signInGoogle } from "$lib/auth-client";

let { form }: PageProps = $props();

let emailInput = $state("");
let passwordInput = $state("");

let invalid = $derived(!emailInput || !passwordInput);

const { startLoading, stopLoading } = useLoading();
</script>

<div>
    <h1>Sign In</h1>
    <p>Don't have an account? <a href="/sign-up">Sign up</a></p>
    {#if !form?.success && form?.message}
        <p style="color: red">{form.message}</p>
    {/if}
    <form method="POST" action="/sign-in" class="bx--form--fluid  bx--form" use:enhance={() => {
        startLoading();
        return async ({ result }) => {
            await applyAction(result)
            passwordInput = "";
            stopLoading();
        };
    }}>
        <TextInput bind:value={emailInput} labelText="Email or Username" type="text" name="emailOrUsername" required />
        <TextInput bind:value={passwordInput} labelText="Password" type="password" name="password" required />
        <Button disabled={invalid} type="submit">Sign In</Button>
        <br>
        <Button on:click={signInGoogle}>Sign in with Google</Button>
    </form>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 4em;
    }
</style>