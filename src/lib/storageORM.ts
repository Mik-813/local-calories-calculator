export class StorageItem<T> {
    data: T;
    key: string;
    storage: Storage;

    constructor(key: string, storage: Storage = localStorage, defaultValue: object | [] | undefined = undefined) {
        const _data = localStorage.getItem(key)
        this.data = _data ? JSON.parse(_data) : defaultValue;
        this.key = key;
        this.storage = storage;
    }

    get(): T {
        return this.data;
    };

    set(val: T) {
        this.data = val;
        this.storage.setItem(this.key, JSON.stringify(val));
    };
}

export class StorageArray<T> extends StorageItem<T[]> {
    constructor(key: string, storage: Storage = localStorage, defaultValue: [] = []) {
        super(key, storage, defaultValue);
    }

    merge(arr: T[], filterCallback: (a: T, b: T) => boolean = () => true) {
        const data = this.get();
        const mergedArrays: T[] = [];
        for (const x of data) {
            for (const y of arr) {
                if (filterCallback(x, y)) mergedArrays.push(y);
            }
        }
        this.set(mergedArrays);
    }
}