<!--
    @component

    Displays a table of user data using Carbon's DataTable component. Uses carbon-components-svelte for styling and functionality.

    @param {() => void} [refetch] - Optional function to refetch the user data.
    @param {Item[]} data - Array of user data objects to be displayed in the table

    Example usage:
    ```svelte
        <UsersTable data={users} refetch={loadUsers} />
    ```
-->
<script lang="ts" generics="Item extends Record<string, any> & {id: string}">
import { DataTable, Pagination } from "carbon-components-svelte";
import { objectToDataTableKeys } from ".";
import DataTableHeader from "./DataTableHeader.svelte";
import DataTableCell from "./DataTableCell.svelte";

let {
  refetch,
  data,
}: {
  refetch?: () => void;
  data: Item[];
} = $props();

let currentPage = $state(1);
let pageSize = $state(10);

let paginatedData = $derived.by(() => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
});
</script>

<DataTableHeader title="Users" refetch={refetch}/>
<div class="table-container">
  <DataTable
    headers={objectToDataTableKeys<Item>(data[0])}
    rows={paginatedData}
  >
    <svelte:fragment slot="cell" let:row let:cell>
      <DataTableCell key={cell.key} value={row[cell.key]}/>
    </svelte:fragment>
  </DataTable>
</div>
<Pagination
  totalItems={data.length}
  bind:page={currentPage}
  pageSizes={[10,20,50,100]}
  bind:pageSize={pageSize}
/>

<style>
div.table-container {
  overflow: scroll;
  width: 100%;
}
</style>
