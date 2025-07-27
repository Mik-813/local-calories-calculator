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

	interface RecipeItem {
		product: Product;
		consumption_g: number;
	}

	interface Recipe {
		items?: RecipeItem[];
		date?: string;
	}
}

export { };
