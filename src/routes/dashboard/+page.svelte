<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1>Dashboard</h1>

{#if data.meetings.length === 0}
	<p>No meetings scheduled yet.</p>
{:else}
	<div class="meetings-grid">
		{#each data.meetings as meeting}
			<article class="meeting-card">
				<h2>{meeting.title}</h2>
				<p>{new Date(meeting.startAt).toLocaleString()}</p>

				{#if meeting.createdBy}
					<p class="created-by">
						Created by {meeting.createdBy.name ?? meeting.createdBy.email}
					</p>
				{/if}
			</article>
		{/each}
	</div>
{/if}
