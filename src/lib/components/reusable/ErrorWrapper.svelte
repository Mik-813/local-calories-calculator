<script lang="ts">
  const { error, children } = $props();
</script>

{#if error}
  <div class="border-2 border-red-500 rounded-md">
    {@render children()}
  </div>
  <span class="text-sm mt-1">{error}</span>
{/if}
