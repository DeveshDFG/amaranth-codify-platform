<script lang="ts">
import { authClient, isValidPassword } from "$lib";
import Line from "$lib/components/Line.svelte";
import { useLoading } from "$lib/shared";
import {
  Button as CarbonButton,
  PasswordInput,
} from "carbon-components-svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

let currentPassword = $state("");
let newPassword = $state("");
let newPasswordValid = $derived(isValidPassword(newPassword));
let confirmNewPassword = $state("");
let passwordsMatch = $derived(newPassword === confirmNewPassword);
let errorMessage = $state("");
let successMessage = $state("");

let shouldCheckMatchingPasswords = $state(false);

$effect(() => {
  if (!shouldCheckMatchingPasswords && confirmNewPassword.length > 0) {
    shouldCheckMatchingPasswords = true;
  }
});

let disabled = $derived(
  !currentPassword || !newPasswordValid || !passwordsMatch,
);

const { startLoading, stopLoading } = useLoading();

const submitForm = async (event: Event) => {
  event.preventDefault();
  startLoading();
  const { data, error } = await authClient.changePassword({
    newPassword,
    currentPassword,
    revokeOtherSessions: true,
  });

  currentPassword = "";
  newPassword = "";
  confirmNewPassword = "";

  if (error) {
    errorMessage = error.message || "An unknown error occurred.";
    successMessage = "";
  } else {
    successMessage = "Password changed successfully.";
    errorMessage = "";
  }

  stopLoading();
};
</script>

<h1>Account Settings</h1>
<Line thickness={1}/>
<br>
{#if data.user}
<p>
  <b>ID:</b>
  {data.user.id}
</p>
<p>
  <b>Username:</b>
  {data.user.username}
</p>
<p>
  <b>Email:</b>
  {data.user.email}
  {data.user.emailVerified ? "(Verified)" : "(Not verified)"}
</p>
<p>
  <b>Role:</b>
  {data.user.role}
</p>
<p>
  <b>Created At:</b>
  {new Date(data.user.createdAt).toLocaleString()}
</p>
<p>
  <b>Updated At:</b>
  {new Date(data.user.updatedAt).toLocaleString()}
</p>
<br>
{/if}
<h3>Change Password</h3>
<br>
{#if errorMessage}
<p style="color: red">{errorMessage}</p>
<br>
{/if}
{#if successMessage}
<p style="color: green">{successMessage}</p>
<br>
{/if}
<form method="POST" class="bx--form--fluid  bx--form" onsubmit={submitForm}>
  <PasswordInput
    labelText="Current Password"
    bind:value={currentPassword}
    type="password"
    name="currentPassword"
    required
  />
  <PasswordInput
    labelText="New Password"
    bind:value={newPassword}
    type="password"
    name="newPassword"
    required
    invalid={!newPasswordValid && newPassword.length > 0}
    invalidText={"Passwords must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character"}
  />
  <PasswordInput
    labelText="Confirm New Password"
    bind:value={confirmNewPassword}
    type="password"
    name="confirmNewPassword"
    required
    invalid={!passwordsMatch && shouldCheckMatchingPasswords}
    invalidText="Passwords do not match."
  />
  <br>
  <CarbonButton disabled={disabled} type="submit">Change Password</CarbonButton>
</form>
