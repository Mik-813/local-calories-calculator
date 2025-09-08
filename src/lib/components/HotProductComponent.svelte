<script lang="ts">
  import { onMount } from "svelte";
  import Slider from "$lib/components/reusable/Slider.svelte";
  import ChevronDown from "$lib/icons/ChevronDownIcon.svelte";
  import CustomInput from "$lib/components/reusable/CustomInput.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { storage } from "$lib/states/storage.svelte";
  import { actions } from "$lib/definitions/actions";

  const hotProducts = $derived(storage.hotProducts.get());

  let {
    hotProduct,
    onRemove,
  }: {
    hotProduct: Product;
    onRemove: (product: Product) => void;
  } = $props();

  let isWrapped = $state(true);
  let isNutriListOpen = $state(false);
  let containerRef: HTMLDivElement;
  let kcal_100g = $state(hotProduct.kcal_100g?.toString() ?? "");

  onMount(() => {
    if (containerRef) {
      containerRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  function toggleWrapping() {
    isWrapped = !isWrapped;
  }

  let title = $state(hotProduct.title);
  let titleError = $state("");

  function setTitle() {
    if (!title) {
      titleError = "Title cannot be empty";
      return;
    }

    if (hotProducts.get(title)) {
      titleError = "Product already exists";
      return;
    }

    storage.hotProducts.reset(hotProduct.title, title, {
      ...hotProduct,
      title,
    });
    titleError = "";
  }
</script>

<div
  class="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl ring-0 transition-all mb-4"
  data-hot-product-title={hotProduct.title}
>
  <div
    bind:this={containerRef}
    class="bg-white rounded-lg p-4"
    data-hot-product-title={hotProduct.title}
  >
    <div class="flex items-center justify-between">
      <button onclick={toggleWrapping} class="text-gray-500 px-1">
        <div style="rotate: {isWrapped ? -90 : 0}deg; transition: rotate 0.2s;">
          <ChevronDown className="size-5" />
        </div>
      </button>
      <span
        class="font-semibold {hotProduct.title
          ? 'text-gray-800'
          : 'text-gray-400'}"
      >
        {hotProduct.title || "(Empty title)"}
      </span>
      <button onclick={() => onRemove(hotProduct)} class="text-gray-500 px-1">
        ✕
      </button>
    </div>

    <ul use:autoAnimate>
      <div class="pt-4"></div>
      {#if !isWrapped}
        <CustomInput
          bind:value={title}
          bind:error={titleError}
          oninput={setTitle}
          label="Title"
        />

        <CustomInput
          value={kcal_100g}
          oninput={(_kcal_100g) => {
            kcal_100g = _kcal_100g;
            actions.hotProduct.set({
              ...hotProduct,
              kcal_100g: Number(_kcal_100g),
            });
          }}
          label="Calories (kcal/100g)"
        />

        <!-- <CustomInput
          value={hotProduct.price}
          oninput={(price) => {
            actions.hotProduct.set({
              ...hotProduct,
              price: Number(price),
            });
          }}
          label="Price (unmanaged currency)"
          type="number"
        /> -->

        <hr
          class="mb-4 mt-2 border-gray-200 border-1 rounded-4xl w-12 mx-auto"
        />
      {/if}

      <Slider
        onCurrentValueChange={(consumption_g) =>
          actions.hotProduct.set({
            ...hotProduct,
            consumption_g: Number(consumption_g),
          })}
        onMaxValueChange={(weight) => {
          actions.hotProduct.set({
            ...hotProduct,
            weight: Number(weight),
          });
        }}
        currentValue={hotProduct.consumption_g}
        maxValue={hotProduct.weight}
      />
    </ul>
  </div>
  <div class="flex flex-col items-center gap-1" use:autoAnimate>
    {#if isNutriListOpen}
      <div
        class="flex flex-col items-center gap-1 p-4 pt-8 text-white bg-white/5 w-full"
      >
        <span class="font-semibold">Calories (kcal)</span>
        <span class="text-sm">
          {((hotProduct.kcal_100g ?? 0) * (hotProduct.consumption_g ?? 0)) /
            100}
        </span>
      </div>
    {/if}
    <div class="flex justify-center w-full">
      <button
        onclick={() => (isNutriListOpen = !isNutriListOpen)}
        class="text-white p-2"
      >
        <div
          style="rotate: {isNutriListOpen
            ? -180
            : 0}deg; transition: rotate 0.2s;"
        >
          <ChevronDown className="size-5 stroke-2" />
        </div>
      </button>
    </div>
  </div>
</div>
