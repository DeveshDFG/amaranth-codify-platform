<script lang="ts">
import { onDestroy } from "svelte";
import type { PageData } from "./$types";
export let data: PageData;

const { user } = data;

let preview: string | null = null;

function handleAvatarChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    if (preview) URL.revokeObjectURL(preview);
    preview = URL.createObjectURL(file);
  } else {
    if (preview) {
      URL.revokeObjectURL(preview);
      preview = null;
    }
  }
}

onDestroy(() => {
  if (preview) URL.revokeObjectURL(preview);
});
</script>

<div class="profile-page">
  <form
    action="?/updateProfile"
    method="POST"
    enctype="multipart/form-data"
    class="profile-form"
  >
    <h2 class="title">User Profile</h2>

    <!-- Profile Picture -->
    <div class="avatar-section">
      <label for="avatar" class="avatar-label">
        <img
          src={preview ?? user.avatar ?? "https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-75355.jpg"}
          alt={user.name}
          class="avatar-img"
        >
        <div class="avatar-overlay">Change</div>
      </label>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        class="avatar-input"
        on:change={handleAvatarChange}
      >
    </div>

    <!-- Profile Info -->
    <div class="info">
      <label for="name">Name</label>
      <input id="name" type="text" name="name" value={user.name}>
    </div>

    <div class="info">
      <label for="bio">Bio</label>
      <textarea id="bio" name="bio">{user.bio}</textarea>
    </div>

    <div class="info">
      <label for="location">Location</label>
      <input id="location" type="text" name="location" value={user.location}>
    </div>

    <div class="info">
      <label for="interests">Interests</label>
      <input
        id="interests"
        type="text"
        name="interests"
        placeholder="Comma separated"
        value={user.interests.join(', ')}
      >
    </div>

    <button type="submit" class="save-btn">Save Changes</button>
  </form>
</div>

<style>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.profile-form {
  padding: 2rem 2.5rem;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.avatar-label {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 2px solid #d0d7de;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(36, 41, 47, 0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-label:hover .avatar-overlay {
  opacity: 1;
}

.avatar-input {
  display: none;
}

.info {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.info label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.info input,
.info textarea {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 0.5rem 0.7rem;
  font-size: 0.9rem;
  color: #24292f;
  background-color: #fefefe;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.info input:focus,
.info textarea:focus {
  border-color: #0969da;
  box-shadow: 0 0 0 2px rgba(9, 105, 218, 0.2);
  outline: none;
}

textarea {
  resize: none;
}

.save-btn {
  display: block;
  width: 100%;
  background-color: #2da44e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #2c974b;
}

.save-btn:active {
  background-color: #298e46;
}
</style>
