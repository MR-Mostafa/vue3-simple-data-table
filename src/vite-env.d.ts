/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly GB_BASE_URL: string;
	readonly GB_TIMEOUT: string;
	readonly GB_Products_limit: string;
	readonly GB_Products_sortBy: string;
	readonly GB_Products_sortType: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
