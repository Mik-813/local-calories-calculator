// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App { }

	interface Product {
		title?: string;
		weight?: number;
		price?: number;
		kcal_100g?: number;
	}

	interface Product extends Product {
		consumption_g: number;
	}

	interface Recipe {
		items?: RecipeItem[];
		date?: string;
	}

  interface Settings {
    currency_sign?: string;
    language: "en" | "pl" | "ua";
  }
}

export { };
