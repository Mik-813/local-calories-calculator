<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import RecipeItemComponent from "$lib/components/HotProductComponent.svelte";
  import Plus from "$lib/icons/PlusIcon.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { storage } from "$lib/states/storage.svelte";
  import NoData from "$lib/components/reusable/NoData.svelte";
  import ArrowPath from "$lib/icons/ArrowPathIcon.svelte";
  import Searchbar from "$lib/components/reusable/Searchbar.svelte";
  import Stats from "$lib/components/Stats.svelte";

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
    hotProducts.push({ consumption_g: 0, weight: 0 });
  }

  function addFromSearch(item: ListItem<Product>) {
    hotProducts.push({ consumption_g: 0, weight: 0, ...item.data });
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

  const searchProducts = $derived(
    storage.persistentProducts
      .get()
      .filter((x) => {
        return hotProducts.every((y) => y.title !== x.title);
      })
      .map((x) => {
        return {
          title: x.title,
          data: x,
          onClick: addFromSearch,
        } as ListItem<Product>;
      }),
  );
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
>
  <Header />

  <div
    class="sticky top-0 z-30
      -mt-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white p-4 flex flex-col gap-4"
  >
    <Stats
      stats={[
        {
          title: "Calories (kcal)",
          reduction: (p) => (p.kcal_100g ?? 0) / 100,
        },
      ]}
    />
    <Searchbar
      placeholder="Add products"
      items={searchProducts}
      onremove={(item) => {
        if (!item.data) return;
        storage.persistentProducts.remove(item.data);
      }}
    >
      {#snippet empty(closeDropdown)}
        <button
          class="flex gap-1.5 items-center px-2 hover:bg-purple-50/50 text-sm cursor-pointer w-full"
          onclick={() => {
            closeDropdown();
            addItem();
          }}
        >
          <div
            class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white p-1.5 m-1.5"
          >
            <Plus className="size-4 stroke-3" />
          </div>
          <span class="text-purple-600 text-sm">Create new product</span>
        </button>
      {/snippet}
    </Searchbar>
  </div>

  <main use:autoAnimate class="px-4 py-8 max-w-4xl mx-auto">
    <button
      class="flex gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-4 rounded-lg font-bold items-center w-full opacity-85"
      onclick={newList}><ArrowPath /> New list</button
    >
    <div class="p-2"></div>
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
</div>
