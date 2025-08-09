<script lang="ts">
  import convert, { type Unit } from "convert-units";
  import { createDebouncer, throttle } from "$lib/utlis/timers";
  import { fade } from "svelte/transition";
  import Modal from "$lib/components/reusable/Modal.svelte";
  import CustomInput from "$lib/components/reusable/CustomInput.svelte";

  const throttledOnSliderInput = throttle(
    (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
      onThumbMove();
      onCurrentValueChange(Number(e.currentTarget.value));
    }, 10
  );

  let {
    currentValue = 0,
    maxValue = 1,
    onCurrentValueChange,
    onMaxValueChange,
  }: {
    currentValue: number;
    maxValue: number;
    onCurrentValueChange: (value: number) => void;
    onMaxValueChange: (value: number) => void;
  } = $props();

  let showTooltip = $state(false);
  let isMaxValueModalVisible = $state(false);
  const prettifiedCurrentValue = $derived(prettify(currentValue, "g"));
  const prettifiedMaxValue = $derived(prettify(maxValue, "g"));
  let expression = $state(`${maxValue ?? ""}`);
  let evaluationError = $state("");

  const debounceShowTooltip = createDebouncer(() => (showTooltip = false), 200);

  function onThumbMove() {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
    showTooltip = true;
    debounceShowTooltip();
  }

  function prettify(value: number, unitFrom: Unit) {
    const obj = convert(value || 1)
      .from(unitFrom)
      .toBest();
    if (value === 0) obj.val = 0;
    return obj.val + obj.unit;
  }
</script>

<div class="px-1 relative">
  {#if showTooltip}
    <div
      transition:fade={{ duration: 200 }}
      class="absolute -top-12 transform -translate-x-1/2 transition-all duration-150 ease-out"
      style="left: {2.4 + (currentValue / maxValue) * 95.2}%"
    >
      <div
        class="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
      >
        <span>
          {((currentValue / maxValue) * 100) >> 0}%
        </span>
        <div
          class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
        ></div>
      </div>
    </div>
  {/if}

  <div class="relative">
    <input
      id="budget"
      type="range"
      min="0"
      max={maxValue}
      value={currentValue}
      oninput={throttledOnSliderInput}
      class="w-full h-2 bg-purple-100 rounded-full appearance-none cursor-pointer slider"
      style="background: linear-gradient(to right, #8b5cf6 0%, #8b5cf6 
      {(currentValue / maxValue) * 100}%, #e9d5ff
      {(currentValue / maxValue) * 100}%, #e9d5ff 100%)"
    />
  </div>
  <div class="flex justify-between text-sm mt-2">
    <span class="text-gray-600">{prettifiedCurrentValue}</span>
    <button
      class="text-purple-600"
      onclick={() => {
        isMaxValueModalVisible = true;
      }}>{prettifiedMaxValue}</button
    >
  </div>

  <Modal bind:visible={isMaxValueModalVisible}>
    {#snippet content(closeModal)}
      <CustomInput
        error={evaluationError}
        value={expression}
        oninput={(value) => {
          expression = value;
          try {
            if (!expression) throw "Expression is empty";
            const evaluation = eval(expression);
            onMaxValueChange(Number(evaluation));
            evaluationError = "";
          } catch {
            evaluationError = "Couldn't evaluate provide expression";
          }
        }}
        initFocus={true}
        onkeydown={(key) => key === "Enter" && closeModal()}
        label="Weight (g)"
        type="text"
      />
    {/snippet}
  </Modal>
</div>

<style>
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    transition: all 0.2s ease;
  }

  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.6);
  }

  .slider::-moz-range-thumb {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b5cf6, #6366f1);
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  .slider::-webkit-slider-track {
    height: 12px;
    border-radius: 6px;
    background: transparent;
  }

  .slider::-moz-range-track {
    height: 12px;
    border-radius: 6px;
    background: transparent;
    border: none;
  }

  .slider:focus {
    outline: none;
  }

  .slider:focus::-webkit-slider-thumb {
    box-shadow:
      0 0 0 4px rgba(139, 92, 246, 0.2),
      0 4px 12px rgba(139, 92, 246, 0.4);
  }

  .slider:focus::-moz-range-thumb {
    box-shadow:
      0 0 0 4px rgba(139, 92, 246, 0.2),
      0 4px 12px rgba(139, 92, 246, 0.4);
  }
</style>
