<script lang="ts">
  import { onClickOutside } from "$lib/actions/clickOutside";
  import Eye from "$lib/icons/EyeIcon.svelte";
  import { storage } from "$lib/states/storage.svelte";

  const persistentProducts = $derived(storage.persistentProducts.get());
  const hotProducts = $derived(storage.hotProducts.get());
  const unregisteredTitles = $derived(storage.unregisteredTitles.get());

  let {
    visible = $bindable(),
    onPersistentClick,
    onHotClick,
  }: {
    visible: boolean;
    onPersistentClick: (product: Product) => void;
    onHotClick: (product: Product) => void;
  } = $props();

  function removePersistentProduct(product: Product) {
    unregiserHotProduct(product);
    storage.persistentProducts.remove(product);
  }

  function unregiserHotProduct(product: Product) {
    if (!product.title) return;
    storage.unregisteredTitles.push(product.title);
  }

  function regiserHotProduct(product: Product) {
    if (!product.title) return;
    storage.unregisteredTitles.remove(product.title);
  }
</script>

{#snippet removeButton(product: Product)}
  <button
    class="text-sm text-gray-300 hover:text-red-500 hover:bg-red-500/10 rounded-full w-8 aspect-square flex items-center justify-center"
    onclick={(e) => {
      e.stopPropagation();
      removePersistentProduct(product);
    }}
    >✕
  </button>
{/snippet}

{#snippet registrationButton(hotProduct: Product)}
  <button
    class="text-sm text-gray-300 hover:text-purple-500 hover:bg-purple-500/10 rounded-full w-8 aspect-square flex items-center justify-center"
    onclick={(e) => {
      e.stopPropagation();
      regiserHotProduct(hotProduct);
    }}
  >
    <Eye />
  </button>
{/snippet}

{#snippet unregistrationButton(hotProduct: Product)}
  <button
    class="text-sm text-gray-300 hover:text-red-500 hover:bg-red-500/10 rounded-full w-8 aspect-square flex items-center justify-center"
    onclick={(e) => {
      e.stopPropagation();
      unregiserHotProduct(hotProduct);
    }}
  >
    <Eye mode="slashed" />
  </button>
{/snippet}

{#snippet dropdownItem(product: Product, isPersistent: boolean)}
  {#if product.title}
    <button
      class="w-full text-sm flex gap-4 justify-between items-center hover:bg-purple-50/50 p cursor-pointer px-4 py-2"
      onclick={() => {
        visible = false;
        isPersistent ? onPersistentClick(product) : onHotClick(product);
      }}
    >
      {#if !isPersistent && unregisteredTitles.includes(product.title)}
        <s class="text-gray-400">{product.title}</s>
      {:else}
        {product.title}
      {/if}

      {#if isPersistent}
        {@render removeButton(product)}
      {:else if unregisteredTitles.includes(product.title)}
        {@render registrationButton(product)}
      {:else}
        {@render unregistrationButton(product)}
      {/if}
    </button>
  {/if}
{/snippet}

{#if visible}
  <ul
    class="w-fit bg-white shadow rounded py-2 absolute z-50"
    use:onClickOutside={() => (visible = false)}
  >
    {#each hotProducts as hotProduct}
      {@render dropdownItem(hotProduct, false)}
    {/each}

    {#each persistentProducts as persistentProduct}
      {@render dropdownItem(persistentProduct, true)}
    {/each}
  </ul>
{/if}
