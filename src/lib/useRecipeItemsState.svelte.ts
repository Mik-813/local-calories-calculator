import { SvelteDate } from "svelte/reactivity";
import { createThrottler } from "$lib/utils";
import { storage } from "$lib/storageInterface";

const items = $state(storage.recipe.get().items ?? []);

const throttleUpdateRecipeItems = createThrottler(() => {
    storage.recipe.set({ items: items, date: new SvelteDate(SvelteDate.now()).toISOString() })
})

export function useRecipeItemsState() {
    $effect(throttleUpdateRecipeItems)
    return items
}