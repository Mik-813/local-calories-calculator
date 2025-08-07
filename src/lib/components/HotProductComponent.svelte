<script lang="ts">
  import { onMount } from "svelte";
  import Slider from "$lib/components/reusable/Slider.svelte";
  import ChevronDown from "$lib/icons/ChevronDownIcon.svelte";
  import CustomInput from "$lib/components/reusable/CustomInput.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import { storage } from "$lib/states/storage.svelte";

  const hotProducts = $derived(storage.hotProducts.get());

  let {
    hotProduct = $bindable(),
    removeItem,
  }: {
    hotProduct: Product;
    removeItem: (items: Product) => void;
    scrollIntoHotProduct: (hotProduct: Product) => void;
  } = $props();

  let isWrapped = $state(false);
  let isVisibleDropdown = $state(false);
  let containerRef: HTMLDivElement;

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

    if (hotProducts.some((hotProduct) => hotProduct.title === title)) {
      titleError = "Product already exists";
      return;
    }

    hotProduct.title = title;
    titleError = "";
  }
</script>

<div
  bind:this={containerRef}
  class="relative bg-white rounded-lg p-4 mb-4"
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
      {hotProduct.title ?? "(Empty title)"}
    </span>
    <button onclick={() => removeItem(hotProduct)} class="text-gray-500 px-1">
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
        onfocus={() => (isVisibleDropdown = true)}
        label="Title"
      />

      <CustomInput
        bind:value={hotProduct.kcal_100g}
        label="Calories (kcal/100g)"
        type="number"
      />

      <CustomInput
        bind:value={hotProduct.price}
        label="Price (unmanaged currency)"
        type="number"
      />

      <hr class="my-4 border-gray-200 border-1 rounded-4xl w-12 mx-auto" />
    {/if}

    <CustomInput
      bind:value={hotProduct.weight}
      label="Weight (g)"
      type="number"
    />

    {#if hotProduct?.weight}
      <Slider
        bind:currentValue={hotProduct.consumption_g}
        maxValue={hotProduct.weight}
      />
    {/if}
  </ul>
</div>
