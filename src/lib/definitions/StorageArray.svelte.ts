import { SvelteMap, SvelteSet } from "svelte/reactivity";

abstract class StorageEntity<T> {
    protected abstract data: T;
    readonly key: string;
    readonly storage: Storage;
    private callbacks = new SvelteSet<(data: T) => void>();

    constructor(key: string, storage: Storage = localStorage) {
        this.key = key;
        this.storage = storage;
    }

    get(): T {
        return this.data;
    };

    set(value: T) {
        this.data = value;
        this.throttleSave()
    };

    save() {
        this.storage.setItem(this.key, JSON.stringify(this.data));
    }

    throttleSave() {
        this.callbacks.forEach(fn => fn(this.data));
        this.save()
    }

    subscribe(fn: (data: T) => void) {
        this.callbacks.add(fn);
        const unsubscribe = () => this.callbacks.delete(fn);
        return unsubscribe;
    }
}

export class StorageItem<T extends object> extends StorageEntity<T> {
    protected data: T;

    constructor(key: string, defaultValue: T, storage: Storage = localStorage) {
        super(key, storage);
        const _data = localStorage.getItem(key)
        this.data = $state(_data ? JSON.parse(_data) : defaultValue);
    }

}

export class StorageArray<T> extends StorageEntity<T[]> {
    protected data: T[];
    constructor(key: string, defaultValue: T[] = [], storage: Storage = localStorage) {
        super(key, storage);
        const _data = localStorage.getItem(key)
        this.data = $state(_data ? JSON.parse(_data) : defaultValue);
    }

    push(...args: T[]) {
        this.set([...this.get(), ...args])
    }

    remove(value: T) {
        this.set(this.get().filter(item => item !== value));
    }
}

export class StorageMap<T> extends StorageEntity<Map<string, T>> {
    protected data: Map<string, T>;
    constructor(key: string, defaultValue: Map<string, T> = new SvelteMap(), storage: Storage = localStorage) {
        super(key, storage);
        const _data = localStorage.getItem(key)
        this.data = $state(_data ? new SvelteMap(JSON.parse(_data)) : defaultValue);
    }

    save() {
        localStorage.setItem(this.key, JSON.stringify(Array.from(this.data.entries())));
    }

    assign(key: string, value: T) {
        this.data.set(key, value)
        this.throttleSave()
    }

    remove(key: string) {
        this.data.delete(key)
        this.throttleSave()
    }

    reset(keyOld: string, keyNew: string, value: T) {
        const temp = new SvelteMap(this.data);
        temp.delete(keyOld)
        temp.set(keyNew, value)
        this.set(temp)
    }

    clear() {
        this.data.clear()
        this.throttleSave()
    }

    has(key: string) {
        return this.data.has(key)
    }

    size() {
        return this.data.size
    }
}