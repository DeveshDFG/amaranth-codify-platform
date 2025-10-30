<script lang="ts">
import { onMount } from "svelte";
import type { PageProps } from "./$types";
import Line from "$lib/components/Line.svelte";
import DataTable from "$lib/components/datatable/DataTable.svelte";

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
<DataTable data={users} refetch={fetchUsers}/>
