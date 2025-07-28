<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let {
    products,
    visible = $bindable(),
    onRemove,
    onClick,
  }: {
    products: Product[];
    visible: boolean;
    onRemove: (product: Product) => void;
    onClick: (product: Product) => void;
  } = $props();

  let dropdownEl: HTMLElement;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      visible = false;
    }
  }

  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
  });

  onDestroy(() => {
    document.removeEventListener("mousedown", handleClickOutside, true);
  });
</script>

{#if visible}
  <ul
    class="w-fit bg-white shadow rounded py-2 absolute z-50"
    bind:this={dropdownEl}
  >
    {#each products as item}
      <li
        class="text-sm flex gap-4 justify-between items-center hover:bg-purple-50/50 p cursor-pointer px-4 py-2"
        tabindex="0"
        onclick={() => {
          visible = false;
          onClick(item);
        }}
      >
        {item.title}
        <button
          class="text-sm text-gray-300 hover:text-red-500 hover:bg-red-500/10 rounded-full w-8 aspect-square flex items-center justify-center"
          onclick={(e) => {
            e.stopPropagation();
            visible = false;
            onRemove(item);
          }}>✕</button
        >
      </li>
    {/each}
  </ul>
{/if}
