// Copyright (c) Mysten Labs, Inc.
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as compiler from 'vue/compiler-sfc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			compiler,
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('mysten-dapp-kit-'),
				},
			},
		}),
		vueJsx(),
	],
});
