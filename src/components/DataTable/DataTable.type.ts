import { ProductsKeys } from '~src/types';

export interface TableBodyProps {
	isLoading: boolean;
	hasError: boolean;
}

export interface TableHeaderList {
	text: ProductsKeys | 'action';
	width: string;
	isSortable: boolean;
}
