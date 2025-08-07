<script lang="ts">
    import { onMount } from "svelte";

    let {
        initFocus,
        value = $bindable(),
        error = $bindable(""),
        label,
        placeholder,
        type = "text",
        onfocus: onFocus,
        onblur: onBlur,
        oninput: onInput,
        onchange: onChange,
        onkeydown: onKeyDown,
    }: {
        initFocus?: boolean;
        value?: string | number;
        error?: string;
        label?: string;
        placeholder?: string;
        type?: string;
        onfocus?: () => void;
        onblur?: () => void;
        oninput?: (value: string) => void;
        onchange?: (value: string) => void;
        onkeydown?: (value: string) => void;
    } = $props();

    let isFocused = $state(false);
    let hasValue = $derived(value !== undefined && value !== "");
    let isActive = $derived(isFocused || hasValue);
    let inputElement: HTMLInputElement | undefined = $state();

    onMount(() => {
        if (initFocus) {
            inputElement?.focus();
        }
    });
</script>

<div class="flex flex-col gap-0">
    <div class="relative py-2">
        <label
            for="inputField"
            class="absolute left-3 {error
                ? 'text-red-500'
                : isFocused
                  ? 'text-purple-600'
                  : 'text-gray-500'} pointer-events-none transition-all duration-200 ease-in-out
            {isActive
                ? `top-0 text-xs font-medium bg-white px-1`
                : 'top-1/2 -translate-y-1/2 text-sm'}
            "
        >
            {label}
        </label>
        <input
            id="inputField"
            bind:value
            bind:this={inputElement}
            {type}
            {placeholder}
            onkeydown={(e) => {
                e.key === "Enter" && e.currentTarget.blur();
                onKeyDown?.(e.key);
            }}
            onchange={(e) => onChange?.(e.currentTarget.value)}
            oninput={(e) => onInput?.(e.currentTarget.value)}
            onfocus={() => {
                isFocused = true;
                onFocus?.();
            }}
            onblur={() => {
                isFocused = false;
                onBlur?.();
            }}
            class="w-full border {error
                ? 'border-red-200'
                : 'border-gray-200'} bg-white focus:ring-2 focus:border-transparent rounded px-3 py-3 transition-all duration-200 outline-none text-sm
            {error ? 'focus:ring-red-500' : 'focus:ring-purple-600'}"
        />
    </div>
    <span class="text-xs text-red-500 px-1 pb-2">{error}</span>
</div>
