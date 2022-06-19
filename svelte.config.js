import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$api: resolve('./src/services/api'),
					$utils: resolve('./src/utils'),
				}
			}
		}
	}
};

export default config;
