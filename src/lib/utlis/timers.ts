export function createThrottler(callback: () => void, milliseconds = 1000) {
    let prev = 0;

    return () => {
        const now = Date.now();

        if (now - prev > milliseconds) {
            callback();
            prev = now;
        }
    }
}

export function createDebouncer(callback: () => void, milliseconds = 1000) {
    let timeoutId: number | undefined;

    return () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback();
        }, milliseconds);
    };
}

export function debounce(fn: () => void, milliseconds: number = 1000): () => void {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    };
}

export function throttle<Args extends unknown[]>(
    fn: (...args: Args) => void,
    milliseconds: number = 1000
) {
    let inThrottle = false;
    return (...args: Args) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, milliseconds);
        }
    };
}
