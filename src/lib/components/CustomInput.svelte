<script lang="ts">
    let {
        value = $bindable(),
        onfocus: onFocus,
        label,
        type = "text",
    }: {
        label: string;
        onfocus?: () => void;
        value?: string | number;
        type?: string;
    } = $props();

    let isFocused = $state(false);
    let hasValue = $derived(value !== undefined && value !== "");
    let isActive = $derived(isFocused || hasValue);
</script>

<div class="relative py-2">
    <label
        for="inputField"
        class="absolute left-3 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out
               {isActive
            ? 'top-0 text-xs font-medium text-purple-600 bg-white px-1'
            : 'top-1/2 -translate-y-1/2 text-sm'}"
    >
        {label}
    </label>
    <input
        id="inputField"
        bind:value
        {type}
        onfocus={() => {
            isFocused = true;
            onFocus?.();
        }}
        onblur={() => (isFocused = false)}
        class="w-full border border-gray-200 bg-white focus:ring-2 focus:ring-purple-400 focus:border-transparent rounded px-3 py-3 transition-all duration-200 outline-none text-sm"
    />
</div>
