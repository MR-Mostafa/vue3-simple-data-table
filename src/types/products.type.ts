export interface ProductItem {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}

export interface ProductList {
	products: ProductItem[];
	total: number;
	skip: number;
	limit: number;
}

export type ProductsKeys = keyof Omit<ProductItem, 'images'>;
