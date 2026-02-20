// Copyright (c) The Social Proof Foundation, LLC.
// SPDX-License-Identifier: Apache-2.0

/**
 * Get window.open() features string for a centered popup.
 * Width 420, height 720 by default (works on laptop screens).
 */
export function getPopupFeatures(width = 420, height = 720): string {
	const left = Math.round((window.screen.width - width) / 2);
	const top = Math.round((window.screen.height - height) / 2);
	return `width=${width},height=${height},left=${left},top=${top},popup=yes`;
}
