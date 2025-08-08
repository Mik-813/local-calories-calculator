<script lang="ts" generics="T">
  import Fuse from "fuse.js";
  import Dropdown from "$lib/components/reusable/Dropdown.svelte";
  import { onClickOutside } from "$lib/actions/clickOutside";
  import type { Snippet } from "svelte";

  const {
    items,
    empty,
    onclick: onClick,
    onremove: onRemove,
    placeholder,
  }: {
    items: ListItem<T>[];
    empty: Snippet<[() => void]>;
    onclick?: (items: ListItem<T>) => void;
    onremove?: (items: ListItem<T>) => void;
    placeholder?: string;
  } = $props();
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
  use:onClickOutside={() => (isDropdownVisible = false)}
  class="relative"
>
  <input
    bind:value
    onclick={() => (isDropdownVisible = true)}
    {placeholder}
    class="w-full border-none rounded-md text-sm text-white bg-white/20 outline-none transition-all ring-0 placeholder:text-white/70 py-3 px-4"
    type="text"
  />
  <Dropdown
    bind:visible={isDropdownVisible}
    items={itemsState}
    {empty}
    onclick={onClick}
    onremove={onRemove}
  />
</div>
