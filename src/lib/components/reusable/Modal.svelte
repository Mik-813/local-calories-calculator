<script lang="ts">
  import { onClickOutside } from "$lib/actions/clickOutside";
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  let {
    visible = $bindable(),
    title,
    children,
  }: { visible: boolean; children?: Snippet; title?: string } = $props();
  function close() {
    visible = false;
  }
</script>

{#if visible}
  <div
    transition:fade={{ duration: 150 }}
    use:onClickOutside={close}
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
  >
    <div class="flex flex-col gap-2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <header class="flex items-center justify-between">
        <span class="text-gray-600 font-medium">{title}</span>
        <button onclick={close} class="text-gray-500 px-1"> ✕ </button>
      </header>
      <main>
        {@render children?.()}
      </main>
    </div>
  </div>
{/if}
