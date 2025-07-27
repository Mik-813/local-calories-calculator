import { StorageItem, StorageArray } from "$lib/storageORM";

export const storage = {
    recipe: new StorageItem<Recipe>("recipe", localStorage, {}),
    products: new StorageArray<Product>("products", localStorage, []),
    recipes: new StorageArray<Recipe>("recipes", localStorage, []),
};
