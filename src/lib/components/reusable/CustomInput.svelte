<script lang="ts">
    let {
        value = $bindable(),
        onfocus: onFocus,
        onchange: onChange,
        onpinput: onInput,
        error = $bindable(""),
        label,
        placeholder,
        type = "text",
    }: {
        label: string;
        placeholder?: string,
        onfocus?: () => void;
        onchange?: (value: string) => void;
        onpinput?: (value: string) => void;
        error?: string;
        value?: string | number;
        type?: string;
    } = $props();

    let isFocused = $state(false);
    let hasValue = $derived(value !== undefined && value !== "");
    let isActive = $derived(isFocused || hasValue);
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
            {type}
            {placeholder}
            onchange={(e: any) => onChange?.(e.target.value)}
            oninput={(e: any) => onInput?.(e.target.value)}
            onfocus={() => {
                isFocused = true;
                onFocus?.();
            }}
            onblur={() => (isFocused = false)}
            class="w-full border { error ? 'border-red-200' : 'border-gray-200'} bg-white focus:ring-2 focus:border-transparent rounded px-3 py-3 transition-all duration-200 outline-none text-sm
            {error ? 'focus:ring-red-500' : 'focus:ring-purple-600'}"
        />
    </div>
    <span class="text-xs text-red-500 px-1 pb-2">{error}</span>
</div>
