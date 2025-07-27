import { SvelteDate } from "svelte/reactivity";
import { throttle } from "$lib/utils";
import { storage } from "$lib/storageInterface";
import { writable } from "svelte/store";

const recipeItemsStore = $state(storage.recipe.get().items ?? []);


export function useRecipeItemsState() {
    $effect(() => {
        storage.recipe.set({ items: recipeItemsStore, date: new SvelteDate(SvelteDate.now()).toISOString() });
    })
    return recipeItemsStore
}