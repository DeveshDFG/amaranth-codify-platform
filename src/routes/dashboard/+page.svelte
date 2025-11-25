<script lang="ts">
import type { PageData } from "./$types";

export let data: PageData;

const { meetings } = data;

type Meeting = PageData["meetings"][number];

const googleCalendarUrl = (meeting: Meeting) => {
  const start = new Date(meeting.startAt);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const format = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");

  const dates = `${format(start)}/${format(end)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: meeting.title ?? "Meeting",
    dates,
    details: meeting.description ?? "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
</script>

<section class="meetings-section">
  <h2>Upcoming meetings</h2>

  {#if meetings.length === 0}
  <p>No meetings scheduled yet.</p>
  {:else}
  <div class="meetings-grid">
    {#each meetings as meeting}
    <article class="meeting-card">
      <h3 class="meeting-title">{meeting.title}</h3>

      {#if meeting.description}
      <p class="meeting-description">{meeting.description}</p>
      {:else}
      <p class="meeting-description empty">
        No description provided for this meeting.
      </p>
      {/if}

      <p class="meeting-datetime">
        {new Date(meeting.startAt).toLocaleString()}
      </p>
      <div class="meeting-actions">
        <a
          href={googleCalendarUrl(meeting)}
          target="_blank"
          rel="noopener noreferrer"
          class="google-calendar-button"
        >
          Add to Google Calendar
        </a>
      </div>
    </article>
    {/each}
  </div>
  {/if}
</section>

<style>
.meetings-section {
  padding: 1.5rem;
}

.meetings-section h2 {
  margin-bottom: 1rem;
}

/* flex container wrapping cards into new rows */
.meetings-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/*width is fixed on height*/
.meeting-card {
  flex: 0 0 260px;
  height: 220px;
  box-sizing: border-box;

  border-radius: 0.75rem;
  border: 1px solid #6d6d6d;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: #363636;
}

.meeting-title {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.meeting-datetime {
  font-size: 0.85rem;
  opacity: 0.8;
  margin: 0 0 0.75rem;
}

.meeting-description {
  font-size: 0.9rem;
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
}

.meeting-actions {
  margin-top: 0.75rem;
}

.google-calendar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  border: 1px solid #4285f4;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  color: #4285f4;
  background: #fff;
  cursor: pointer;
}

.google-calendar-button:hover {
  background: #4285f4;
  color: #fff;
}

.meeting-description.empty {
  opacity: 0.6;
  font-style: italic;
}

@media (max-width: 600px) {
  .meeting-card {
    flex: 0 0 calc(50% - 0.5rem);
    height: 200px;
  }
}

@media (max-width: 400px) {
  .meeting-card {
    flex: 0 0 100%;
    height: auto;
  }
}
</style>
