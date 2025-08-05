<script lang="ts" generics="T">
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";

  let {
    visible = $bindable(),
    items,
    empty,
  }: { visible: boolean; items: ListItem<T>[]; empty: Snippet<[()=>void]> } = $props();
</script>

{#if visible}
  <ul
    class="absolute inset-x-0 bg-white shadow rounded py-2 z-50"
    transition:fly={{ duration: 200 }}
  >
    {#if items.length > 0}
      {#each items as item}
        <div class="flex justify-between hover:bg-purple-50/50 text-sm">
          <button
            class="flex-1 px-4 cursor-pointer flex items-center justify-start"
            onclick={() => {
              visible = false;
              item.onClick?.(item);
            }}
          >
            {item.title}
          </button>
          <button
            class="p-2 items-center group"
            onclick={() => {
              item.onRemove?.(item);
            }}
          >
            <div
              class="content-center h-6 rounded-full text-gray-300 group-hover:text-gray-500 group-hover:bg-gray-500/10 aspect-square transition-colors cursor-pointer"
            >
              ✕
            </div>
          </button>
        </div>
      {/each}
    {:else}
      <div>
        {@render empty(() => (visible = false))}
      </div>
    {/if}
  </ul>
{/if}
