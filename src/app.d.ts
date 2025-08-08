// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App { }

	interface Product {
		title: string;
		price?: number;
		kcal_100g?: number;
		weight: number;
	}

	interface Product extends Product {
		[key: string]
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

	interface ListItem<T> {
		title: string
		data?: T
		onClick?: (option: ListItem<T>) => void
		onRemove?: (option: ListItem<T>) => void
	}

	interface Stat {
		title: string;
		reduction: (product: Product) => number;
	}
}

export { };
