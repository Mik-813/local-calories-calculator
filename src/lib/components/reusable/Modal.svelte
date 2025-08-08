<script lang="ts">
  import { onClickOutside } from "$lib/actions/clickOutside";
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  let {
    visible = $bindable(false),
    title,
    content,
  }: {
    visible: boolean;
    title?: string;
    content?: Snippet<[() => void]>;
  } = $props();

  function closeModal() {
    visible = false;
  }
</script>

{#if visible}
  <div
    transition:fade={{ duration: 150 }}
    class="flex flex-col justify-around items-center p-2 bg-black/50 z-50
    fixed inset-0"
  >
    <div class="sm:hidden"></div>
    <form
      class="flex flex-col bg-white rounded-lg shadow-lg w-full h-fit max-w-md px-4 py-3 gap-1"
      use:onClickOutside={closeModal}
    >
      <div class="flex items-center justify-between">
        <span class="text-gray-600 font-medium">{title}</span>
        <!-- when using a <button> tag here, clicking it teleports you to the begining of the page for some reason. -->
        <!-- Substituted with <div> -->
        <div
          aria-label="close button"
          role="button"
          tabindex="0"
          onclick={closeModal}
          class="text-gray-500 px-1 cursor-pointer"
        >
          ✕
        </div>
      </div>
      <main>
        {@render content?.(closeModal)}
      </main>
    </form>
  </div>
{/if}
