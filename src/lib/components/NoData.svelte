
{#if !products?.length}
<div class="text-center py-12">
  <div
    class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center"
  >
    <svg
      class="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  </div>
  <h2 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
    No products provided
  </h2>
  <p class="text-gray-500">
    Add some food items to start tracking your calories
  </p>
</div>
{:else}
<div class="space-y-4">
  {#each products as product}
    <div
      class="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-4 border border-purple-200"
    >
      <h3 class="font-semibold text-gray-800">{product.name}</h3>
      <p class="text-gray-600">{product.calories} kcal</p>
    </div>
  {/each}
</div>
{/if}