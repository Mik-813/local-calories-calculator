import { SvelteSet } from "svelte/reactivity";

export class StorageItem<T extends object> {
    readonly data: T;
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
        // this.data.;
        this.storage.setItem(this.key, JSON.stringify(this.data));
        this.callbacks.forEach(callback => callback(value));
    };
    
}

export class StorageArray<T> {
    readonly data: T[];
    readonly key: string;
    readonly storage: Storage;
    private callbacks = new SvelteSet<(data: T[]) => void>();

    constructor(key: string, defaultValue: T[] = [], storage: Storage = localStorage) {
        const _data = localStorage.getItem(key)
        this.data = $state(_data ? JSON.parse(_data) : defaultValue);
        this.key = key;
        this.storage = storage;
    }

    get(): T[] {
        return this.data;
    };

    set(value: T[]) {
        this.data.splice(0, this.data.length, ...value);
        this.storage.setItem(this.key, JSON.stringify(this.data));
        this.callbacks.forEach(callback => callback(value));
    };

    merge(value: T[], mergeCallback: (a: T, b: T) => boolean = () => true) {
        const data = this.get();
        const mergedArr = [...value];

        for (const x of data) {
            for (const y of mergedArr) {
                if (!mergeCallback(x, y)) {
                    mergedArr.push(y);
                }
            }
        }

        this.set(mergedArr);
    }

    push(...args: T[]) {
        this.set([...this.data, ...args])
    }

    remove(value: T) {
        this.set(this.data.filter(item => item !== value));
    }

    subscribe(callback: (data: T[]) => void) {
        this.callbacks.add(callback);
        const unsubscribe = () => this.callbacks.delete(callback);
        return unsubscribe;
    }
}