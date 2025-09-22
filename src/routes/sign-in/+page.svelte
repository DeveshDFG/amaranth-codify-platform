<script lang="ts">
import { Button, FluidForm, TextInput } from "carbon-components-svelte";
import type { PageProps } from "./$types";

let { form }: PageProps = $props();

let emailInput = $state("");
let passwordInput = $state("");

let errorMessage: string = $state(form?.message || "");

let invalid = $derived(!emailInput || !passwordInput);
</script>

<div>
    <h1>Sign In</h1>
    <p>Don't have an account? <a href="/sign-up">Sign up</a></p>
    {#if errorMessage}
        <p style="color: red">{errorMessage}</p>
    {/if}
    <FluidForm method="POST" action="/sign-in">
        <TextInput bind:value={emailInput} labelText="Email or Username" type="text" name="emailOrUsername" required />
        <TextInput bind:value={passwordInput} labelText="Password" type="password" name="password" required />
        <Button disabled={invalid} type="submit">Sign In</Button>
    </FluidForm>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1em;
        padding: 4em;
    }
</style>