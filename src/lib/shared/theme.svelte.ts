import type { CarbonTheme } from "carbon-components-svelte/src/Theme/Theme.svelte";
import { browser } from "$app/environment";

let __theme: CarbonTheme | null = $state<CarbonTheme | null>(
  browser ? (localStorage.getItem("theme") as CarbonTheme) : null,
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
    if (__theme) {
      window.localStorage.setItem("theme", __theme);
    }
  });
});
