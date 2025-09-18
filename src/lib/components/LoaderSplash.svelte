<script lang="ts">
import { Loading } from "carbon-components-svelte";
</script>

<div>
    <Loading/>
</div>

<style>
    :global(.bx--loading__stroke) {
        stroke: #f4f4f4;
    }
    :global(.bx--loading-overlay) {
        background: #161616
    }
    div {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>