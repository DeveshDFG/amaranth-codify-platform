<script lang="ts">
import type { PageProps } from "./$types";
import Line from "$lib/components/Line.svelte";
import DataTable from "$lib/components/datatable/DataTable.svelte";
import { Tab, TabContent, Tabs } from "carbon-components-svelte";
import MeetingForm from "$lib/components/dashboard/admin/MeetingForm.svelte";

let { data }: PageProps = $props();

let users = $state(data.users);

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
<Tabs autoWidth={true}>
  <Tab label="Create Meetings"/>
  <Tab label="Manage Meetings"/>
  <Tab label="User Management"/>
  <svelte:fragment slot="content">
    <TabContent>
      <MeetingForm/>
    </TabContent>
    <TabContent>
      <DataTable data={users} refetch={fetchUsers}/>
    </TabContent>
  </svelte:fragment>
</Tabs>
