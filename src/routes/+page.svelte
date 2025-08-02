<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import RecipeItemComponent from "$lib/components/HotProductComponent.svelte";
  import Plus from "$lib/icons/PlusIcon.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { storage } from "$lib/states/storage.svelte";
  import NoData from "$lib/components/reusable/NoData.svelte";
  import ArrowPath from "$lib/icons/ArrowPathIcon.svelte";

  let hotProducts = $state(storage.hotProducts.get());

  function scrollIntoHotProduct(product: Product) {
    const index = hotProducts.findIndex((x) => x === product);
    if (index !== -1) {
      const element = document.querySelector(
        `[data-hot-product-title="${hotProducts[index].title}"]`,
      ) as HTMLElement;
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }

  function addItem() {
    hotProducts.push({ consumption_g: 0 });
  }

  function removeHotProduct(hotProduct: Product) {
    const index = hotProducts.findIndex((x) => x === hotProduct);
    if (index !== -1) {
      hotProducts.splice(index, 1);
    }
  }

  function newList() {
    storage.persistentProducts.push(
      ...storage.hotProducts.get().filter((x) => {
        return (
          x.title &&
          !storage.unregisteredTitles.get().includes(x.title) &&
          storage.persistentProducts.get().every((y) => y.title !== x.title)
        );
      }),
    );
    hotProducts = [];
  }

  $effect(() => storage.hotProducts.set(hotProducts));
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
>
  <Header />

  <main use:autoAnimate class="px-4 py-8 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    {#each hotProducts as _, i}
      <RecipeItemComponent
        bind:hotProduct={hotProducts[i]}
        removeItem={removeHotProduct}
        {scrollIntoHotProduct}
      />
    {/each}
    {#if !hotProducts.length}
      <NoData />
    {/if}
  </main>

  <div class="fixed right-0 bottom-0 m-4">
    <div class="flex flex-col gap-2">
      <button
        class="flex gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-4 rounded-lg font-bold items-center"
        onclick={addItem}><Plus /> Add item</button
      >
      <button
        class="flex gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white p-4 rounded-lg font-bold items-center"
        onclick={newList}><ArrowPath /> New list</button
      >
    </div>
  </div>
</div>
