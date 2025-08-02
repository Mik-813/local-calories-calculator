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

export function debounce(fn: () => void, milliseconds: number): () => void {
    let timer: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    };
}

export function throttle(fn: () => void, milliseconds: number): () => void {
    let inThrottle = false;
    return () => {
        if (!inThrottle) {
            fn();
            inThrottle = true;
            setTimeout(() => inThrottle = false, milliseconds);
        }
    };
}
