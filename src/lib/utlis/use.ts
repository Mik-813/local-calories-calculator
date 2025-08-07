import { storage } from "$lib/states/storage.svelte";

export function useWeighter(fn: (product: Product) => number) {
  const currentValue = storage.hotProducts.get().reduce(
    (acc, p) => acc + fn(p) * (p.consumption_g ?? 0),
    0,
  );

  const maxValue = storage.hotProducts.get().reduce(
    (acc, p) => acc + fn(p) * (p.weight ?? 0),
    0,
  );

  return [currentValue, maxValue];
}