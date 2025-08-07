<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import UnitProgressBar from "$lib/components/reusable/UnitProgressBar.svelte";

  const { stats }: { stats: Stat[] } = $props();
</script>

<div use:autoAnimate>
  {#each stats as stat}
    <UnitProgressBar reduction={stat.reduction} title={stat.title} />
  {/each}
</div>
