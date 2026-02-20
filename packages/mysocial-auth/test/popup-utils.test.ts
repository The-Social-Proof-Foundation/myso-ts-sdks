/**
 * @vitest-environment happy-dom
 */
// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

import { describe, it, expect } from 'vitest';
import { getPopupFeatures } from '../src/popup-utils.js';

describe('getPopupFeatures', () => {
	it('returns popup features with default size', () => {
		const features = getPopupFeatures();
		expect(features).toContain('width=420');
		expect(features).toContain('height=720');
		expect(features).toContain('popup=yes');
		expect(features).toMatch(/left=\d+/);
		expect(features).toMatch(/top=\d+/);
	});

	it('accepts custom width and height', () => {
		const features = getPopupFeatures(500, 600);
		expect(features).toContain('width=500');
		expect(features).toContain('height=600');
	});
});
