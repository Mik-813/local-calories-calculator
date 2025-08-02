<script lang="ts">
  import { type Snippet } from "svelte";
  const { className = "size-6 stroke-2", children }: { className?: string, children: Snippet } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  class={className}
>
  {@render children()}
</svg>
