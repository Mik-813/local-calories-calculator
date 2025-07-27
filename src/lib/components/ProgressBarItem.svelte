<script lang="ts">
  const { currentValue, maxValue } = $props();
  const progressPercentage = $derived((currentValue / maxValue) * 100);
</script>

<div class="px-4 pb-6 sm:px-6 lg:px-8">
  <div class="backdrop-blur-sm rounded-2xl p-4 sm:p-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div class="text-sm sm:text-base font-medium">
        Calories: {currentValue}/{maxValue} kcal
      </div>
      <div class="text-sm sm:text-base font-medium">
        Left: {maxValue - currentValue} kcal
      </div>
    </div>

    <div class="mt-4">
      <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          class="h-full bg-purple-300 rounded-full transition-all duration-500 ease-out"
          style="width: {Math.min(progressPercentage, 100)}%"
        ></div>
      </div>
      <div class="mt-2 text-xs sm:text-sm text-white/80 text-center">
        {progressPercentage.toFixed(1)}% of daily goal
      </div>
    </div>
  </div>
</div>
