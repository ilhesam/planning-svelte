import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: [
		preprocess({
			postcss: true,
			typescript: true
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
