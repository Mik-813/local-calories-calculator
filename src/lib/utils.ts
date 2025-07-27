export function throttle(callback: () => void, milliseconds = 1000) {
    let prev = 0;

    return () => {
        const now = Date.now();

        if (now - prev > milliseconds) {
            callback();
            prev = now;
        }
    }
}

export function debounce(callback: () => void, delay = 1000) {
    let timeoutId: number | undefined;

    return () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback();
        }, delay);
    };
}
