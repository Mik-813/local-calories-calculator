import { storage } from "$lib/states/storage.svelte";

export const actions = {
  hotProduct: {
    scrollInto(title: string) {
      const element = document.querySelector(
        `[data-hot-product-title="${title}"]`,
      ) as HTMLElement;
      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add("ring-3", "ring-purple-500");
      setTimeout(
        () => element.classList.remove("ring-3", "ring-purple-500"),
        1000,
      );
    },
    create(title: string) {
      storage.hotProducts.assign(title, {
        title,
        consumption_g: 0,
        weight: 100,
      });
    },

    add(hotProduct: ListItem<Product>) {
      if (!hotProduct.data?.title) return;
      storage.hotProducts.assign(hotProduct.data?.title, {
        ...hotProduct.data,
      });
    },

    remove(hotProduct: Product) {
      storage.hotProducts.remove(hotProduct.title);
    },
  },

  newList() {
    storage.hotProducts
      .get()
      .forEach(
        (value, key) => key && storage.persistentProducts.assign(key, { ...value, consumption_g: 0 }),
      );
    storage.hotProducts.clear();
  },
  clearAll() {
    storage.hotProducts.clear();
    storage.persistentProducts.clear();
    storage.unregisteredTitles.clear();
  },
};
