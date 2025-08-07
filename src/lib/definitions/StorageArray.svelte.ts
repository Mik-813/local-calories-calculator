import { SvelteSet } from "svelte/reactivity";

export class StorageItem<T extends object> {
    protected data: T;
    readonly key: string;
    readonly storage: Storage;
    private callbacks = new SvelteSet<(data: T) => void>();

    constructor(key: string, defaultValue: T, storage: Storage = localStorage) {
        const _data = localStorage.getItem(key)
        this.data = $state(_data ? JSON.parse(_data) : defaultValue);
        this.key = key;
        this.storage = storage;
    }

    get(): T {
        return this.data;
    };

    set(value: T) {
        this.data = value;
        this.storage.setItem(this.key, JSON.stringify(this.data));
        this.callbacks.forEach(callback => callback(value));
    };

    subscribe(fn: (data: T) => void) {
        this.callbacks.add(fn);
        const unsubscribe = () => this.callbacks.delete(fn);
        return unsubscribe;
    }
}

export class StorageArray<T> extends StorageItem<T[]> {
    constructor(key: string, defaultValue: T[] = [], storage: Storage = localStorage) {
        super(key, defaultValue, storage);
    }

    push(...args: T[]) {
        this.set([...this.get(), ...args])
    }

    remove(value: T) {
        this.set(this.get().filter(item => item !== value));
    }
}