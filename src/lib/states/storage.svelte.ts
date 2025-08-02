import { StorageArray, StorageItem } from "$lib/definitions/StorageArray.svelte"

export const storage = {
    hotProducts: new StorageArray<Product>("hotProducts"),
    persistentProducts: new StorageArray<Product>("persistentProducts"),
    unregisteredTitles: new StorageArray<string>("unregisteredProductTitles"),
    settings: new StorageItem<Settings>("settings", {language: "en"})
};
