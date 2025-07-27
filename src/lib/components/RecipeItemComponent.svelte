<script lang="ts">
  import { useBooleanState } from "$lib/boolean-object.svelte";
  import Chevron from "$lib/icons/Chevron.svelte";
  import { createDebouncer } from "$lib/utils";
  import { fade } from "svelte/transition";
  import CustomInput from "./CustomInput.svelte";
  import autoAnimate from "@formkit/auto-animate";

  const {
    item = $bindable(),
    removeItem,
  }: { item: RecipeItem; removeItem: (items: RecipeItem) => void } = $props();

  let isWrapped = $state(false);
  let showTooltip = useBooleanState(false);

  function toggleWrapping() {
    isWrapped = !isWrapped;
  }
  const debounceShowTooltip = createDebouncer(showTooltip.setFalse, 200);

  function onThumbMove() {
    showTooltip.setTrue();
    debounceShowTooltip();
  }
</script>

<div class="relative bg-white rounded-lg p-4 mb-4">
  {#if showTooltip}
    <div
      transition:fade={{ duration: 150 }}
      class="flex items-center justify-between"
    >
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
  {/if}

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
        <div class="px-1 py-1 relative">
          <div
            class="absolute -top-12 transform -translate-x-1/2 transition-all duration-150 ease-out"
            style="left: {2.4 +
              (item.consumption_g / item.product.weight) * 95.2}%"
          >
            <div
              class="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
            >
              <span>
                {item.consumption_g}g&nbsp;/&nbsp;{((item.consumption_g /
                  item.product.weight) *
                  100) >>
                  0}%
              </span>
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
              ></div>
            </div>
          </div>

          <div class="relative">
            <input
              id="budget"
              type="range"
              min="0"
              max={item.product.weight}
              bind:value={item.consumption_g}
              oninput={onThumbMove}
              class="w-full h-2 bg-purple-100 rounded-full appearance-none cursor-pointer slider"
              style="background: linear-gradient(to right, #8b5cf6 0%, #8b5cf6 
      {(item.consumption_g / item.product.weight) * 100}%, #e9d5ff
      {(item.consumption_g / item.product.weight) * 100}%, #e9d5ff 100%)"
            />
          </div>
          <div class="flex justify-between text-sm text-gray-600 mt-2">
            <span>{item.consumption_g}g</span>
            <span>{item.product.weight}g</span>
          </div>
        </div>
      {/if}
    {/if}
  </ul>
</div>

<style>
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    transition: all 0.2s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.6);
  }

  .slider::-moz-range-thumb {
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  .slider::-webkit-slider-track {
    height: 12px;
    border-radius: 6px;
    background: transparent;
  }

  .slider::-moz-range-track {
    height: 12px;
    border-radius: 6px;
    background: transparent;
    border: none;
  }

  .slider:focus {
    outline: none;
  }

  .slider:focus::-webkit-slider-thumb {
    box-shadow:
      0 0 0 4px rgba(139, 92, 246, 0.2),
      0 4px 12px rgba(139, 92, 246, 0.4);
  }

  .slider:focus::-moz-range-thumb {
    box-shadow:
      0 0 0 4px rgba(139, 92, 246, 0.2),
      0 4px 12px rgba(139, 92, 246, 0.4);
  }
</style>
