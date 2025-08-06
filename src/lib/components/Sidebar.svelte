<script lang="ts">
  import type { Component } from "svelte";
  import { fade } from "svelte/transition";

  interface SidebarItem {
    title: string;
    description: string;
    className: string;
    Icon: Component;
    onClick: () => void;
  }
  let {
    sidebarOpen = $bindable(),
    items = [],
  }: { sidebarOpen: boolean; items: SidebarItem[] } = $props();

  const closeSidebar = () => {
    sidebarOpen = false;
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
  class="fixed top-0 left-full h-full w-80 max-w-[90vw] bg-gradient-to-b from-purple-600 via-purple-700 to-indigo-600 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
  {sidebarOpen ? '-translate-x-full' : 'translate-x-0'}"
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
      {#each items as item}
        <button
          onclick={item.onClick}
          class="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 {item.className} rounded-lg flex items-center justify-center overflow-hidden"
            >
              <div
                class="bg-gradient-to-br from-white/40 to-white/10 w-full h-full p-2"
              >
                <item.Icon />
              </div>
            </div>
            <div class="flex-1">
              <div class="font-semibold">{item.title}</div>
              <div class="text-sm text-white/70">{item.description}</div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>
