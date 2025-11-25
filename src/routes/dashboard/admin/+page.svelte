<script lang="ts">
import type { PageProps } from "./$types";
import Line from "$lib/components/Line.svelte";
import DataTable from "$lib/components/datatable/DataTable.svelte";
import { Tab, TabContent, Tabs } from "carbon-components-svelte";
import MeetingForm from "$lib/components/dashboard/admin/MeetingForm.svelte";
import { theme } from "$lib/shared/theme.svelte";
import { afterNavigate } from "$app/navigation";

let { data }: PageProps = $props();

let users = $state(data.users);
let meetings = $derived(data.meetings ?? []);

// dark / light
let darkMode = $derived(theme() === "g100");

let selectedTab = $state(0);
let createdMeetingId = $state<string | null>(null);

let editingId: string | null = $state(null);
let openMenuId: string | null = $state(null);
let editTitle: string = $state("");
let editDescription: string = $state("");
let editLink: string = $state("");
let editStartAt: string = $state("");

if (typeof window !== "undefined") {
  afterNavigate(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    selectedTab = tab === "manage" ? 1 : tab === "users" ? 2 : 0;
  });
}

const toLocalInputValue = (value: string | Date) => {
  const d = new Date(value);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
};

const toggleMenu = (id: string) => {
  openMenuId = openMenuId === id ? null : id;
};

const startEdit = (meeting: any) => {
  editingId = meeting.id;
  openMenuId = null;
  editTitle = meeting.title ?? "";
  editDescription = meeting.description ?? "";
  editLink = meeting.link ?? "";
  editStartAt = toLocalInputValue(meeting.startAt);
};

const cancelEdit = () => {
  editingId = null;
};

const fetchUsers = async () => {
  const response = await fetch("/api/admin/users");
  if (response.ok) {
    const refetchedUsers = await response.json();
    users = refetchedUsers;
  }
};
</script>

<h1>Admin</h1>
<Line thickness={1}/>
<br>

<Tabs autoWidth={true} bind:selected={selectedTab}>
  <Tab label="Create Meetings"/>
  <Tab label="Manage Meetings"/>
  <Tab label="User Management"/>

  <svelte:fragment slot="content">
    <!-- create meetings -->
    <TabContent>
      <MeetingForm/>
    </TabContent>

    <!-- manage meetings -->
    <TabContent>
      {#if meetings.length === 0}
      <p>No meetings scheduled yet.</p>
      {:else}
      {#each meetings as meeting}
      <article
        style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;border:1px solid #333;padding:0.75rem 1rem;border-radius:0.5rem;margin-bottom:0.5rem;"
      >
        {#if editingId === meeting.id}
        <!-- edit -->
        <form
          method="POST"
          action="?/update-meeting"
          style="flex:1;display:flex;flex-direction:column;gap:0.5rem;"
        >
          <input type="hidden" name="id" value={meeting.id}>

          <label style="font-size:0.9rem;">
            Title
            <input
              name="title"
              bind:value={editTitle}
              required
              style="width:100%;"
            >
          </label>

          <label style="font-size:0.9rem;">
            Start time
            <input
              type="datetime-local"
              name="startAt"
              bind:value={editStartAt}
              required
              style="width:100%;"
            >
          </label>

          <label style="font-size:0.9rem;">
            Description
            <textarea
              name="description"
              bind:value={editDescription}
              rows="2"
              style="width:100%;"
            ></textarea>
          </label>

          <label style="font-size:0.9rem;">
            Link
            <input name="link" bind:value={editLink} style="width:100%;">
          </label>

          <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
            <button type="submit">Save</button>
            <button type="button" onclick={cancelEdit}>Cancel</button>
          </div>
        </form>
        {:else}
        <!-- view -->
        <div style="flex:1;">
          <h3 style="margin:0 0 0.25rem 0;">{meeting.title}</h3>
          <p style="margin:0 0 0.25rem 0;font-size:0.9rem;">
            {new Date(meeting.startAt).toLocaleString()}
          </p>

          {#if meeting.link}
          <p style="margin:0 0 0.25rem 0;font-size:0.9rem;">
            <a href={meeting.link} target="_blank" rel="noopener noreferrer">
              Join link
            </a>
          </p>
          {/if}

          {#if meeting.description}
          <p style="margin:0;font-size:0.9rem;color:#bbb;">
            {meeting.description}
          </p>
          {/if}
        </div>

        <!-- 3-dot menu -->
        <div style="position:relative;">
          <button
            type="button"
            onclick={() => toggleMenu(meeting.id)}
            aria-label="Meeting options"
            style={`border:none;background:transparent;font-size:1.25rem;cursor:pointer;line-height:1;color:${
                    darkMode ? "#f4f4f4" : "#161616"
                  }
            ;`}
          >
            ⋮
          </button>

          {#if openMenuId === meeting.id}
          <div
            style="position:absolute;right:0;margin-top:0.25rem;padding:0.25rem 0;min-width:120px;z-index:10;box-shadow:0 2px 4px rgba(0,0,0,0.3);border-radius:0.25rem;"
            style:border={darkMode ? "1px solid #565656" : "1px solid #ccc"}
            style:background={darkMode ? "#161616" : "#f4f4f4"}
            style:color={darkMode ? "#f4f4f4" : "#161616"}
          >
            <button
              type="button"
              style="display:block;width:100%;text-align:left;padding:0.25rem 0.75rem;border:none;background:transparent;cursor:pointer;"
              style:color={darkMode ? "#f4f4f4" : "#161616"}
              onclick={() => startEdit(meeting)}
            >
              Edit
            </button>

            <form method="POST" action="?/delete-meeting">
              <input type="hidden" name="id" value={meeting.id}>
              <button
                type="submit"
                style="display:block;width:100%;text-align:left;padding:0.25rem 0.75rem;border:none;background:transparent;cursor:pointer;"
                style:color={darkMode ? "#ff8389" : "#b00020"}
              >
                Delete
              </button>
            </form>
          </div>
          {/if}
        </div>
        {/if}
      </article>
      {/each}
      {/if}
    </TabContent>

    <!-- user Management -->
    <TabContent>
      <DataTable data={users} refetch={fetchUsers}/>
    </TabContent>
  </svelte:fragment>
</Tabs>
