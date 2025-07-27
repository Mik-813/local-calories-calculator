<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import RecipeItemComponent from "$lib/components/RecipeItemComponent.svelte";
  import Plus from "$lib/icons/Plus.svelte";
  import { useRecipeItemsState } from "$lib/useRecipeItemsState.svelte";

  let items = useRecipeItemsState();

  function addItem() {
    items.push({ product: {}, consumption_g: 0 });
  }

  function removeRecipeItem(item: RecipeItem) {
    items = items.filter((i) => i !== item);
  }
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
>
  <Header {items} />

  <button
    class="fixed flex gap-1 right-0 bottom-0 m-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-4 rounded-xl font-bold"
    onclick={addItem}><Plus /> Add item</button
  >

  <main class="px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    {#each items as _, i}
      <RecipeItemComponent bind:item={items[i]} removeItem={removeRecipeItem} />
    {/each}
  </main>
</div>
