import { StorageArray, StorageItem, StorageMap } from "$lib/definitions/StorageArray.svelte"

export const storage = {
    hotProducts: new StorageMap<Product>("hotProducts"),
    persistentProducts: new StorageMap<Product>("persistentProducts"),
    unregisteredTitles: new StorageArray<string>("unregisteredProductTitles"),
    settings: new StorageItem<Settings>("settings", { language: "en" })
};
