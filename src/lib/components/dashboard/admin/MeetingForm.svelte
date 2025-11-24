<script lang="ts">
import { applyAction, enhance } from "$app/forms";
import { localTimezone, timezones } from "$lib/date-time";
import { useLoading } from "$lib/shared";
import type { SubmitFunction } from "@sveltejs/kit";
import {
  DatePicker,
  DatePickerInput,
  SelectItem,
  TextArea as CarbonTextArea,
  TextInput,
  TimePicker,
  TimePickerSelect,
  Button as CarbonButton,
  ToastNotification,
} from "carbon-components-svelte";
import type { PageProps } from "../../../../routes/dashboard/admin/$types";

const { startLoading, stopLoading } = useLoading();

let success: boolean | null = $state(null);
let resultMessage: string = $state("");
let resultMeetingId: string = $state("");

const dateTimeValue = $state(new Date());
dateTimeValue.setDate(dateTimeValue.getDate() + 1);
dateTimeValue.setSeconds(0);
// Round minutes to nearest 15
const minutes = dateTimeValue.getMinutes();
const roundedMinutes = Math.round(minutes / 15) * 15;
dateTimeValue.setMinutes(roundedMinutes);

const datePickerString = $derived(
  dateTimeValue.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }),
);

const timePickerString = $derived.by(() => {
  const hours = dateTimeValue.getHours();
  const minutes = dateTimeValue.getMinutes();
  return `${dateTimeValue.getHours().toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
});

const datePickerStringSetter = (
  value: CustomEvent<
    | string
    | {
        selectedDates: [dateFrom: Date, dateTo?: Date | undefined];
        dateStr: string | { from: string; to: string };
      }
  >,
) => {
  if (typeof value.detail !== "object" || value.detail === null) {
    console.error("value.detail is not an object:", value.detail);
    return;
  }
  if (!("dateStr" in value.detail)) {
    console.error("dateStr is not a key of detail:", value.detail);
    return;
  }
  if (typeof value.detail.dateStr !== "string") {
    console.error("dateStr is not a string:", value.detail.dateStr);
    return;
  }
  const [month, day, year] = value.detail.dateStr.split("/").map(Number);
  dateTimeValue.setFullYear(year, month - 1, day);
};

const timePickerStringSetter = (event: Event) => {
  const [hours, minutes] = (event.target as HTMLInputElement).value
    .split(":")
    .map(Number);
  dateTimeValue.setHours(hours, minutes);
};

const submitForm: SubmitFunction = ({ formData }) => {
  {
    formData.set("time", dateTimeValue.toISOString());
    formData.delete("date");
    startLoading();
    return async ({ result }) => {
      if (result.type === "success" && result.data && result.data.success) {
        success = true;
        resultMessage = "Meeting created successfully.";
        resultMeetingId = result.data.meetingId;
        await applyAction(result);
      } else {
        success = false;
        resultMessage = "Failed to create meeting.";
      }
      stopLoading();
    };
  }
};
</script>

{#if success !== null}
  {#if success}
    <ToastNotification
      hideCloseButton={true}
      fullWidth={true}
      kind="success"
      title="Success"
      subtitle={resultMessage}
      timeout={5000}
      lowContrast={true}
      on:close={(e) => {
                e.preventDefault();
            }}
    >
      <a href={`/dashboard?meeting=${resultMeetingId} `} slot="caption"
        >View meeting</a
      >
    </ToastNotification>
  {:else}
    <ToastNotification
      hideCloseButton={true}
      fullWidth={true}
      kind="error"
      title="Error"
      subtitle={resultMessage}
      timeout={5000}
      lowContrast={true}
      on:close={(e) => {
                e.preventDefault();
            }}
    />
  {/if}
{/if}
<form
  style="display: flex; flex-direction: column; gap: 1em;"
  method="POST"
  action="/dashboard/admin?/create-meeting"
  use:enhance={submitForm}
>
  <DatePicker
    datePickerType="single"
    on:change={datePickerStringSetter}
    value={datePickerString}
    minDate={new Date()}
  >
    <DatePickerInput
      name="date"
      labelText="Meeting date"
      placeholder="mm/dd/yyyy"
    />
  </DatePicker>
  <TimePicker
    name="time"
    size="xl"
    pattern="([01][0-9]|2[0-3]):[0-5][0-9]"
    labelText="Meeting time"
    placeholder="hh:mm"
    on:change={timePickerStringSetter}
    value={timePickerString}
  >
    <TimePickerSelect name="tz" value={localTimezone}>
      {#each timezones as tz}
      <SelectItem value={tz} text={tz}/>
      {/each}
    </TimePickerSelect>
  </TimePicker>
  <TextInput
    name="title"
    labelText="Meeting title"
    placeholder="Enter meeting title"
  />
  <CarbonTextArea
    name="description"
    labelText="Meeting description"
    placeholder="Enter meeting description"
  />
  <CarbonButton type="submit">Create Meeting</CarbonButton>
</form>
