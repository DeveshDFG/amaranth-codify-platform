import { SvelteDate } from "svelte/reactivity";
import { randomString } from "$lib/string";

const MINIMUM_LOADING_TIME_MS = 500;

let loaders = $state(new Set<string>());

const loading = $derived(loaders.size !== 0);

let startedLoadingTime = $state<number | null>(null);

export const useLoading = () => {
  const id = randomString();

  const isLoading = () => {
    return loading;
  };

  const startLoading = () => {
    if (loaders.size === 0) {
      startedLoadingTime = SvelteDate.now();
    }
    loaders = new Set([...loaders, id]);
  };

  const stopLoading = () => {
    const next = new Set(loaders);
    next.delete(id);
    if (next.size === 0 && startedLoadingTime !== null) {
      const elapsed = SvelteDate.now() - startedLoadingTime;
      const remainingTime = MINIMUM_LOADING_TIME_MS - elapsed;
      if (remainingTime > 0) {
        setTimeout(() => {
          loaders = next;
          startedLoadingTime = null;
        }, remainingTime);
        return;
      }
    } else {
      loaders = next;
    }
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    id,
  };
};
