<script lang="ts" generics="T">
  import Fuse from "fuse.js";
  import Dropdown from "$lib/components/reusable/Dropdown.svelte";
  import { clickOutside } from "$lib/actions/clickOutside";

  const { items }: { items: ListItem<T>[] } = $props();
  let itemsState = $state(items);
  let isDropdownVisible = $state(false);
  let value = $state("");

  function search<T>(val: string, items: ListItem<T>[]) {
    const fuse = new Fuse(items, {
      keys: ["title"],
      threshold: 0.1,
    });

    return val ? fuse.search(val).map((res) => res.item) : items;
  }

  $effect(() => {
    itemsState = search(value, items);
  });
</script>

<div
  use:clickOutside={() => (isDropdownVisible = false)}
  class="relative space-y-2"
>
  <input
    bind:value
    onclick={() => (isDropdownVisible = true)}
    placeholder="Search..."
    class="w-full border-none rounded-md text-sm text-gray-500 focus:ring-purple-600 outline-none transition-all ring-0 focus:ring-2 py-3 px-4"
    type="text"
  />
  <Dropdown bind:visible={isDropdownVisible} items={itemsState} />
</div>
