import type { CarbonTheme } from "carbon-components-svelte/src/Theme/Theme.svelte";
import { browser } from "$app/environment";

let __theme: CarbonTheme = $state<CarbonTheme>(
  (browser ? (localStorage.getItem("theme") as CarbonTheme) : null) ?? "g10",
);

/**
 * Use `theme()` to get the reactive value. Use `setTheme` to mutate this value.
 * @returns currently selected theme.
 */
export const theme = () => __theme;

/**
 * localStorage automatically updated in browser.
 * @param newTheme target theme to set
 */
export const setTheme = (newTheme: CarbonTheme) => {
  __theme = newTheme;
};

$effect.root(() => {
  $effect(() => {
    window.localStorage.setItem("theme", __theme);
  });
});
