import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig, type ConfigEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv) => {
	const isDevMode = config.mode === "development";

	return {
		plugins: [vue()],
		css: {
			devSourcemap: isDevMode,
			preprocessorOptions: {
				sass: {
					javascriptEnabled: true,
				},
			},
		},
		resolve: {
			alias: {
				"~src": resolve(__dirname, "src"),
			},
		},
		envDir: resolve(__dirname, "src", "env"),
		envPrefix: "GB_",
	};
});
