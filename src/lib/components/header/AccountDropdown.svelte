<script lang="ts">
import {
  OverflowMenu,
  OverflowMenuItem,
  Theme,
} from "carbon-components-svelte";
import { User } from "carbon-icons-svelte";
</script>

<OverflowMenu flipped>
    <User slot="menu" color="white"/>
    <OverflowMenuItem text="Sign In" href="/sign-in"/>
    <OverflowMenuItem text="Sign Up" href="/sign-up"/>
</OverflowMenu>