export interface TableBodyProps {
	isLoading: boolean;
	hasError: boolean;
}

export interface TableHeaderList {
	text: string;
	onSort?: (sortBy: string) => void;
	sortType?: (sortBy: string) => 'asc' | 'des' | undefined;
	width: string;
}
