<script lang="ts">
  import { fade } from "svelte/transition";
  import millify from "millify";
  import { useWeighter } from "$lib/utlis/use";

  const { formula: reduction, title }: Stat = $props();

  const [currentValue, maxValue] = $derived(useWeighter(reduction));
  const progressPercentage = $derived((currentValue / maxValue) * 100);
  const left = $derived(maxValue - currentValue);
</script>

<div class="flex flex-col gap-2">
  <div class="font-semibold">
    {title}
  </div>

  <div class="flex justify-between text-sm">
    <span>{millify(currentValue)}</span>
    {#if left}
      <span transition:fade={{ duration: 100 }}>{millify(left)} left</span>
    {/if}
  </div>
  <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
    <div
      class="h-full bg-purple-300 rounded-full transition-all duration-500 ease-out"
      style="width: {Math.min(progressPercentage, 100)}%"
    ></div>
  </div>
</div>
