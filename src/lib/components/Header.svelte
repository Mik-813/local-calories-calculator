<script lang="ts">
  import { useBooleanState } from "$lib/boolean-object.svelte";
  import ProgressBarItem from "./ProgressBarItem.svelte";
  import Sidebar from "./Sidebar.svelte";

  const isSidebarOpen = useBooleanState(false);

  let { items }: { items: RecipeItem[] } = $props();
</script>

<header
  class="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white shadow-lg"
>
  <div class="px-4 py-6 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">
        Calories Calculator
      </h1>

      <button
        onclick={isSidebarOpen.setTrue}
        class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
        aria-label="Open menu"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
    </div>
  </div>

  {#if items.length > 0}
    <ProgressBarItem
      currentValue={items.reduce(
        (acc, item) =>
          acc +
          ((item.product.kcal_100g || 0) * (item.consumption_g || 0)) / 100,
        0,
      )}
      maxValue={items.reduce(
        (acc, item) =>
          acc +
          ((item.product.kcal_100g || 0) * (item.product.weight || 0)) / 100,
        0,
      )}
    />
  {/if}

  <Sidebar bind:sidebarOpen={isSidebarOpen.value} />
</header>
