<script lang="ts">
  import { fade } from "svelte/transition";
  let { sidebarOpen = $bindable() } = $props();

  const closeSidebar = () => {
    sidebarOpen = false;
  };

  const handleImport = () => {
    console.log("Import clicked");
  };

  const handleExport = () => {
    console.log("Export clicked");
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") closeSidebar();
  };
</script>

{#if sidebarOpen}
  <div
    transition:fade={{ duration: 150 }}
    class="fixed inset-0 bg-purple-200/50 backdrop-blur-sm z-40"
    onclick={closeSidebar}
    role="button"
    tabindex="0"
    onkeydown={handleKeydown}
  ></div>
{/if}
<!-- Sidebar -->
<div
  class="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-600 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out {sidebarOpen
    ? 'translate-x-0'
    : 'translate-x-full'}"
>
  <div class="p-6">
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xl font-bold">Menu</h2>
      <button
        onclick={closeSidebar}
        class="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
        aria-label="Close menu"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Sidebar Buttons -->
    <div class="space-y-4">
      <button
        onclick={handleImport}
        class="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
          </div>
          <div>
            <div class="font-semibold">Import</div>
            <div class="text-sm text-white/70">Import food data</div>
          </div>
        </div>
      </button>

      <button
        onclick={handleExport}
        class="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-left transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <div class="font-semibold">Export</div>
            <div class="text-sm text-white/70">Export your data</div>
          </div>
        </div>
      </button>
    </div>
  </div>
</div>
