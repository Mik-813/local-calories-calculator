<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import UnitProgressBar from "$lib/components/reusable/UnitProgressBar.svelte";

  const { stats }: { stats: Stat[] } = $props();
</script>

<div class="text-white" use:autoAnimate>
  {#each stats as stat}
    <UnitProgressBar formula={stat.formula} title={stat.title} />
  {/each}
</div>
