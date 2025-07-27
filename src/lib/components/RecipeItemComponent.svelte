<script lang="ts">
  import Slider from "$lib/components/Slider.svelte";
  import Chevron from "$lib/icons/Chevron.svelte";
  import CustomInput from "$lib/components/CustomInput.svelte";
  import autoAnimate from "@formkit/auto-animate";

  const {
    item = $bindable(),
    removeItem,
  }: { item: RecipeItem; removeItem: (items: RecipeItem) => void } = $props();

  let isWrapped = $state(false);

  function toggleWrapping() {
    isWrapped = !isWrapped;
  }
</script>

<div class="relative bg-white rounded-lg p-4 mb-4">
  <div class="flex items-center justify-between">
    <button onclick={() => toggleWrapping()} class="text-gray-500 px-1">
      <div style="rotate: {isWrapped ? 90 : 0}deg; transition: rotate 0.2s;">
        <Chevron className="size-5" />
      </div>
    </button>
    <span
      class="font-semibold {item.product?.title
        ? 'text-gray-800'
        : 'text-gray-400'}"
    >
      {item.product?.title || "(Empty title)"}
    </span>
    <button onclick={() => removeItem(item)} class="text-gray-500 px-1">
      ✕
    </button>
  </div>

  <ul use:autoAnimate>
    {#if !isWrapped}
      <div class="pt-4"></div>
      <CustomInput bind:value={item.product.title} label="Title" />

      <CustomInput
        bind:value={item.product.kcal_100g}
        label="Calories (kcal/100g)"
        type="number"
      />

      <CustomInput
        bind:value={item.product.price}
        label="Price (unmanaged currency)"
        type="number"
      />

      <hr class="my-4 border-gray-200 border-1 rounded-4xl w-12 mx-auto" />

      <CustomInput
        bind:value={item.product.weight}
        label="Weight (g)"
        type="number"
      />

      {#if item.product?.weight}
        <Slider currentValue={item.consumption_g} maxValue={item.product.weight}></Slider>
      {/if}
    {/if}
  </ul>
</div>
