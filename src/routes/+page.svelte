<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import HotProductComponent from "$lib/components/HotProductComponent.svelte";
  import Plus from "$lib/icons/PlusIcon.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { storage } from "$lib/states/storage.svelte";
  import NoData from "$lib/components/reusable/NoData.svelte";
  import ArrowPath from "$lib/icons/ArrowPathIcon.svelte";
  import Searchbar from "$lib/components/reusable/Searchbar.svelte";
  import Stats from "$lib/components/Stats.svelte";
  import MagnifierIcon from "$lib/icons/MagnifierIcon.svelte";
  import { actions } from "$lib/definitions/actions";

  const searchProducts = $derived(
    Array.from(storage.persistentProducts.get())
      .filter(([key]) => !storage.hotProducts.has(key))
      .map(([key, value]) => {
        return {
          title: key,
          data: value,
          onClick: actions.hotProduct.add,
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
      -mt-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 p-4 flex flex-col gap-4"
  >
    <Stats
      stats={[
        {
          title: "Calories (kcal)",
          formula: (p) => (p.kcal_100g ?? 0) / 100,
        },
      ]}
    />
    <Searchbar
      placeholder="Add products"
      items={searchProducts}
      onremove={(item) => storage.persistentProducts.remove(item.title)}
      onclick={actions.hotProduct.add}
    >
      {#snippet empty(closeDropdown, title)}
        {#if !storage.hotProducts.has(title)}
          <button
            class="flex gap-1.5 items-center px-2 hover:bg-purple-50/50 text-sm cursor-pointer w-full"
            onclick={() => {
              closeDropdown();
              actions.hotProduct.create(title);
            }}
          >
            <div
              class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white p-1.5 m-1.5"
            >
              <Plus className="size-4 stroke-3" />
            </div>
            <span class="text-purple-600 text-sm">Create new product</span>
          </button>
        {:else}
          <button
            class="flex gap-0.5 items-center px-2 hover:bg-purple-50/50 text-sm cursor-pointer w-full text-purple-600"
            onclick={() => {
              closeDropdown();
              actions.hotProduct.scrollInto(title);
            }}
          >
            <div class="p-1.5">
              <MagnifierIcon className="size-7 stroke-[1.5]" />
            </div>

            <span class="text-sm">{title || "Locate untitled product"}</span>
          </button>
        {/if}
      {/snippet}
    </Searchbar>
  </div>

  <main use:autoAnimate class="px-4 py-8 max-w-4xl mx-auto">
    <button
      class="flex gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-4 rounded-lg font-bold items-center w-full opacity-85"
      onclick={actions.newList}><ArrowPath /> New list</button
    >
    <div class="p-2"></div>
    {#each storage.hotProducts.get() as [_, hotProduct]}
      <HotProductComponent {hotProduct} onRemove={actions.hotProduct.remove} />
    {/each}
    {#if !storage.hotProducts.size()}
      <NoData />
    {/if}
  </main>
</div>
