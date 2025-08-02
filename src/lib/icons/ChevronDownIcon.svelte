<script lang="ts">
  import IconLayout from "$lib/icons/IconLayout.svelte";
  const { className }: { className?: string } = $props();
</script>

<IconLayout {className}>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="m19.5 8.25-7.5 7.5-7.5-7.5"
  />
</IconLayout>
